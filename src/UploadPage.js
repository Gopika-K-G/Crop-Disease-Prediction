import React, { useState } from 'react';

const UploadFilesPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [answers, setAnswers] = useState({
        diseaseFoundDate: '',
        nearbyAffected: ''
    });

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        // Logic for predicting disease based on the image and answers
    };

    return (
        <div className="upload-container">
            <h2>Upload Crop Image</h2>
            <input type="file" onChange={handleFileChange} />
            <div>
                <label>When did you find the disease?</label>
                <input
                    type="date"
                    name="diseaseFoundDate"
                    value={answers.diseaseFoundDate}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Is the disease seen in your nearby surroundings?</label>
                <input
                    type="text"
                    name="nearbyAffected"
                    value={answers.nearbyAffected}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSubmit}>Predict Disease</button>
        </div>
    );
};

export default UploadFilesPage;
