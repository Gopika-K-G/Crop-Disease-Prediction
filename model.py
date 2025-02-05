import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import preprocess_input

# Parameters
img_height, img_width = 150, 150
batch_size = 32
num_classes = 5  

# Get the current directory (where model.py is located)
base_dir = os.path.dirname(os.path.abspath(__file__))

# Prepare the data
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    os.path.join(base_dir, 'data'),  # Path to the data folder
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical'
)

validation_generator = val_datagen.flow_from_directory(
    os.path.join(base_dir, 'data'),  # Path to the data folder
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical'
)

# Load InceptionV3 model with pre-trained weights, excluding the top layer
base_model = InceptionV3(
    weights=os.path.join(base_dir, 'inception_v3_weights_tf_dim_ordering_tf_kernels_notop.h5'),  # Path to the pre-trained model
    include_top=False, 
    input_shape=(img_height, img_width, 3)
)

# Add custom layers on top of the InceptionV3 base model
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(num_classes, activation='softmax')(x)

# Create the model
model = Model(inputs=base_model.input, outputs=predictions)

# Freeze the base InceptionV3 layers
for layer in base_model.layers:
    layer.trainable = False

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=10,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // batch_size
)

# Save the model
model.save(os.path.join(base_dir, 'crop_detection_model.h5'))  # Save model to the same directory

# Evaluate the model
loss, accuracy = model.evaluate(validation_generator)
print(f'Validation Loss: {loss}')
print(f'Validation Accuracy: {accuracy}')

def prepare_image(img_path, target_size):
    
    img = image.load_img(img_path, target_size=target_size)  # Load image with target size
    img_array = image.img_to_array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = preprocess_input(img_array)  # Preprocess the image for InceptionV3
    return img_array

def predict_image(img_path, model, target_size):
    
    img_array = prepare_image(img_path, target_size)
    predictions = model.predict(img_array)  # Predict class probabilities
    predicted_class = np.argmax(predictions, axis=1)  # Get the index of the highest probability
    return predicted_class, predictions


