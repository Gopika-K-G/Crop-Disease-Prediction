import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Webcam from "react-webcam";
import './CropDetails.css';

const cropDetails = {
  1: { 
    name: 'Wheat', 
    fullName: 'Common Wheat (Triticum aestivum)', 
    description: 'Wheat is a widely cultivated crop. Diseases that affect wheat include rust, powdery mildew, and root rot.',
    diseases: ['Rust', 'Powdery Mildew', 'Root Rot'],
    fertilizers: ['Nitrogen-based fertilizers', 'Phosphorus-based fertilizers'],
    image: 'https://images.pexels.com/photos/265278/pexels-photo-265278.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  2: { 
    name: 'Corn', 
    fullName: 'Maize (Zea mays)', 
    description: 'Corn is susceptible to diseases such as leaf blight, smut, and rust.',
    diseases: ['Leaf Blight', 'Smut', 'Rust'],
    fertilizers: ['Potassium-based fertilizers', 'Phosphorus-based fertilizers'],
    image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  3: { 
    name: 'Rice', 
    fullName: 'Asian Rice (Oryza sativa)', 
    description: 'Rice can be affected by diseases like blast, sheath blight, and bacterial blight.',
    diseases: ['Bacterial blight', 'Brownspot', 'Leafsmut'],
    fertilizers: ['Nitrogen-based fertilizers', 'Potassium-based fertilizers'],
    causes:['Bacterial infection.Severe winds, which cause wounds, and over fertilization are suitable factors for the development of the disease','Fungal infection.It is common in unflooded and nutrient-deficient soil, or in soils that accumulate toxic substances.','Fungal infection. Leaf smut is more likely to occur late in the growing season and in areas with high nitrogen rates.'],
    prevention:['Spray fresh cowdung extract for the control of bacterial blight.Allow fallow fields to dry in order to suppress disease agents in the soil and plant residues.','Monitor soil nutrients regularly.Growing Resistant varieties like ADT 44,PY 4,CORH 1,CO 44,CAUVERY,BHAVANI,TPS 4 and Dhanu.','Remove infected seeds, panicles, and plant debris after harvest.Reduce humidity levels through alternate wetting and drying (AWD) rather than permanently flooding the fields.'],
    image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
};

function CropDetail() {
  const { cropId } = useParams();
  const crop = cropDetails[cropId];
  
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [questions, setQuestions] = useState({});
  const [responses, setResponses] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({}); // Track disabled state for each button
  const [finalPrediction, setFinalPrediction] = useState(''); // State for final prediction
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setImagePreview(reader.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleScanClick = () => {
    setShowModal(true);
  };

  const handleChooseUpload = () => {
    setShowModal(false);
    setUseWebcam(false); 
    document.getElementById('fileInput').click();
  };

  const handleChooseScan = () => {
    setShowModal(false);
    setUseWebcam(true); 
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImagePreview(imageSrc);
    setStep(2);
  };

  const handlePredictDisease = () => {
    if (!imagePreview) {
      console.error("Image preview is null or undefined");
      return;
    }

    const imageBase64 = imagePreview.split(',')[1];
    if (!imageBase64) {
      console.error("Base64 image data is not found or invalid.");
      return;
    }

    const requestData = {
      image: imageBase64
    };

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Not a Crop') {
        setAlertMessage('The uploaded image does not correspond to a crop.');
        setPredictionResult(null);
        setQuestions({});
        setResponses({});
        setStep(1); // Reset step to allow another upload
      } else {
        const { predicted_classes, questions } = data;
        setPredictionResult(predicted_classes);
        setQuestions(questions);
        setResponses({
          [predicted_classes[0]]: 0,
          [predicted_classes[1]]: 0
        });
        setStep(3);  // Move to the next step
        setAlertMessage(''); // Clear any previous alert message
      }
    })
    .catch(error => {
      console.error('Error during fetch operation:', error);
    });
  };

  const handleResponse = (diseaseIndex, isYes) => {
    setResponses(prev => ({
      ...prev,
      [diseaseIndex]: prev[diseaseIndex] + (isYes ? 1 : 0)
    }));

    // Disable the button once pressed
    setDisabledButtons(prev => ({
      ...prev,
      [diseaseIndex]: true
    }));
  };

  const handleFinalPrediction = () => {
    if (!predictionResult || predictionResult.length === 0) {
      setFinalPrediction('No disease prediction available.');
      return;
    }

    const finalPredictionIndex = Object.keys(responses).reduce((a, b) => 
      responses[a] > responses[b] ? a : b
    );
    
    const predictedDisease = crop.diseases[finalPredictionIndex];
    const cause = crop.causes[finalPredictionIndex];
    const prevention=crop.prevention[finalPredictionIndex];
    
    setFinalPrediction(
      <div className="final-prediction-container">
        <strong>Final Predicted Disease:</strong> {predictedDisease}
        <br />
        <strong>Cause:</strong> {cause}
        <br />
        <strong>Prevention:</strong> {prevention}
      </div>
    );
      };

  return (
    <div className="crop-detail-container">
      <img src={crop.image} alt={crop.name} className="crop-image" />
      <h2>{crop.name}</h2>
      <h3>{crop.fullName}</h3>
      <p>{crop.description}</p>
      
      <h4>Possible Diseases:</h4>
      <ul>
        {crop.diseases.map((disease, index) => (
          <li key={index}>{disease}</li>
        ))}
      </ul>

      <h4>Recommended Fertilizers:</h4>
      <ul>
        {crop.fertilizers.map((fertilizer, index) => (
          <li key={index}>{fertilizer}</li>
        ))}
      </ul>

      <div className="scan-options">
        <button onClick={handleScanClick} className="cta-button">Scan or Upload Image</button>
        <input 
          type="file" 
          id="fileInput" 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
          accept="image/*" 
        />
      </div>

      {useWebcam && (
        <div className="webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
          <button onClick={captureImage} className="cta-button">Capture Image</button>
        </div>
      )}

      {imagePreview && (
        <div className="image-preview">
          <h4>Image Preview:</h4>
          <img src={imagePreview} alt="Crop Preview" />
        </div>
      )}

      {step === 2 && (
        <button onClick={handlePredictDisease}>Predict Disease</button>
      )}

      {step === 3 && predictionResult && (
        <div className="questionnaire">
          <h4>Answer the following questions to confirm the disease:</h4>
          {predictionResult.map((diseaseIndex, i) => (
            <div key={diseaseIndex}>
              <h5>Disease: {crop.diseases[diseaseIndex]}</h5>
              {(questions[diseaseIndex] || []).map((question, qIndex) => (
                <div key={qIndex} className="question">
                  <p>{question}</p>
                  <button 
                    onClick={() => handleResponse(diseaseIndex, true)}
                    disabled={disabledButtons[diseaseIndex]}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleResponse(diseaseIndex, false)}
                    disabled={disabledButtons[diseaseIndex]}
                  >
                    No
                  </button>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleFinalPrediction}>Submit Responses</button>
          {finalPrediction && (
            <p className="final-prediction" style={{ whiteSpace: 'pre-line' }}>
              {finalPrediction}
            </p>
          )}
        </div>
      )}

      {alertMessage && (
        <p className="alert-message">{alertMessage}</p>
      )}

      <Link to="/home" className="back-link">Back to Home Page</Link>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Choose an option</h4>
            <button onClick={handleChooseUpload}>Upload an Image</button>
            <button onClick={handleChooseScan}>Use Webcam to Scan</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDetail;
