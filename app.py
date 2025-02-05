import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input

app = Flask(__name__)
CORS(app)  # This will allow requests from your React app

# Load your pre-trained model
base_dir = os.path.dirname(os.path.abspath(__file__))
model = load_model(os.path.join(base_dir, 'crop_detection_model.h5'))  # Use the correct path

# Function to prepare the image for prediction
def prepare_image(img, target_size=(150, 150)):
    img = img.resize(target_size)  # Resize image to match the input shape of the model
    img_array = image.img_to_array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = preprocess_input(img_array)  # Preprocess the image for InceptionV3
    return img_array

# Mapping of disease classes to their questions
disease_questions = {
    0: [
        "Is the plant showing signs of wilting?",
        "Are there any spots on the leaves?",
        "Is the color of the plant abnormal?",
        "Has there been a decrease in yield?",
        "Is there any unusual growth on the plant?"
    ],
    1: [
        "Are the leaves yellowing?",
        "Is the stem of the plant weak?",
        "Is there any mold visible on the plant?",
        "Is the plant growing slower than expected?",
        "Are there any dark spots on the stem?"
    ],
    2: [
        "Does the plant have curled leaves?",
        "Are the fruits affected?",
        "Is there discoloration in the stem?",
        "Is there a foul smell from the plant?",
        "Has the plant stopped producing flowers?"
    ],
    3: [],  # No questions for class 3
    4: []   # No questions for class 4
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image from the request
        data = request.json
        img_data = data['image']  # The image is expected to be base64 encoded
        
        # Decode the image
        img_bytes = base64.b64decode(img_data)
        img = Image.open(io.BytesIO(img_bytes))

        # Prepare the image
        img_array = prepare_image(img)

        # Predict using the model
        predictions = model.predict(img_array)[0]  # Extract the array from the nested array
        top_2_indices = np.argsort(predictions)[-2:][::-1]  # Get indices of the top 2 predictions
        top_2_predictions = predictions[top_2_indices]  # Get the top 2 prediction probabilities

        # Check if class 4 (Healthy Crop) is among the top 2 predictions
        if 4 in top_2_indices:
            response = {
                'message': 'Not a Crop'
            }
        else:
            # Retrieve questions for the top 2 predicted diseases
            questions = {str(i): disease_questions.get(i, []) for i in top_2_indices}

            # Create the response
            response = {
                'predicted_classes': top_2_indices.tolist(),
                'probabilities': top_2_predictions.tolist(),
                'questions': questions
            }
        
        print(response)
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
