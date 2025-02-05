// src/ChatBox.js

import React, { useState } from 'react';
import './ChatBox.css';

const responses = {
  'hi': 'Hello! What’s your name?',
  'hello': 'Hi there! What can I help you with today?',
  'my name is': name => `Nice to meet you, ${name}! How can I assist you with crop disease prediction today?`,
  'how can i help you': 'I can help you with crop disease predictions. Please provide details about the crop or disease.',
  'what is crop disease prediction': 'Crop disease prediction uses models to identify potential diseases in crops based on images or other data.',
  'what are common crop diseases': 'Common crop diseases include wheat rust, rice blast, and corn blight. Each has specific symptoms and treatment methods.',
  'how to prevent crop diseases': 'Preventing crop diseases involves practices like crop rotation, using disease-resistant varieties, proper irrigation, and timely application of fungicides or pesticides.',
  'how to treat crop diseases': 'Treatment depends on the disease. Common methods include applying fungicides or pesticides, improving soil health, and removing infected plants.',
  'what is crop rotation': 'Crop rotation is the practice of growing different types of crops in the same area across seasons to improve soil health and reduce pest and disease risks.',
  'what is integrated pest management': 'Integrated Pest Management (IPM) is a holistic approach to managing pests that combines biological, cultural, mechanical, and chemical practices to minimize the impact on the environment and human health.',
  'how to identify plant diseases': 'Plant diseases can often be identified by symptoms like discoloration, spots, wilting, or unusual growth patterns. Diagnostic tools and expert consultations can provide more accurate identifications.',
  'how to improve soil health': 'Improving soil health involves practices like adding organic matter, using cover crops, reducing tillage, and ensuring proper nutrient management.',
  'what is a disease-resistant variety': 'A disease-resistant variety is a crop that has been bred or selected to resist specific diseases, reducing the need for chemical treatments and improving yield.',
  'how can i submit a sample for testing': 'To submit a sample for testing, contact local agricultural extension services or specialized plant pathology labs for instructions on sample collection and submission.',
  'what are the symptoms of wheat rust': 'Symptoms of wheat rust include reddish-brown pustules on leaves, stems, and heads, and reduced plant vigor.',
  'how can i manage rice blast': 'Managing rice blast involves using resistant varieties, proper spacing, and applying fungicides if necessary.',
  'what causes corn blight': 'Corn blight is caused by several pathogens, including bacteria and fungi. It leads to leaf spots, wilting, and poor grain development.',
  'when should i apply fungicides': 'Fungicides should be applied based on disease forecasts, plant growth stages, and when symptoms are first observed. Follow local agricultural advice for timing.',
  'how to store harvested crops': 'Proper storage involves keeping crops in a cool, dry place with good ventilation to prevent spoilage and pest infestation.',
  'what is the best way to test soil health': 'Soil health can be tested using soil tests to measure nutrients, pH, and organic matter levels. Contact local extension services for soil testing services.',
  'how do i start with precision agriculture': 'Precision agriculture involves using technology like GPS, drones, and sensors to monitor and manage crops more accurately. Start with small-scale trials and expand as needed.',
  'what are cover crops': 'Cover crops are plants grown to cover soil between main crops. They help improve soil health, reduce erosion, and increase nutrient availability.',
  'what is sustainable agriculture': 'Sustainable agriculture focuses on producing food while preserving environmental quality and ensuring long-term farm profitability through practices like crop rotation, reduced chemical use, and conservation tillage.',
  'how to manage pests naturally': 'Natural pest management includes using beneficial insects, crop rotation, natural repellents, and maintaining healthy soil to deter pests without chemical pesticides.',
  'what is organic farming': 'Organic farming avoids synthetic chemicals and fertilizers, focusing on natural methods like composting, green manures, and biological pest control to maintain healthy crops and soil.',
  'what is the role of fertilizers': 'Fertilizers provide essential nutrients to plants, helping them grow healthy and strong. Proper use is key to avoiding nutrient imbalances and environmental harm.',
  'how to control weeds': 'Weed control methods include manual weeding, mulching, using cover crops, and applying herbicides when necessary. Integrated approaches often yield the best results.',
  'what are the benefits of crop diversification': 'Crop diversification reduces risks from pests, diseases, and market fluctuations, improves soil health, and can increase farm profitability.',
  'how to monitor crop health': 'Monitoring crop health involves regular field inspections, using technology like drones or sensors, and consulting with experts when needed.',
  'how to improve irrigation efficiency': 'Improving irrigation efficiency includes using drip irrigation, scheduling watering based on soil moisture levels, and maintaining irrigation systems to prevent leaks and waste.',

'how to manage water resources in farming': 'Water management in farming involves techniques like drip irrigation, rainwater harvesting, and proper scheduling of irrigation to ensure crops receive the right amount of water without waste.',
'what are organic farming practices': 'Organic farming practices include using natural fertilizers like compost, avoiding synthetic pesticides, and rotating crops to maintain soil health.',
'how to deal with soil erosion': 'Prevent soil erosion by planting cover crops, using mulch, practicing contour farming, and building terraces to reduce the speed of water runoff.',
'what is no-till farming': 'No-till farming is a method where the soil is not plowed before planting. This reduces soil erosion, improves water retention, and maintains soil health by preserving organic matter.',
'what are the benefits of crop diversification': 'Crop diversification involves growing a variety of crops in a specific area. It can improve soil health, reduce pest and disease risks, and provide a more stable income for farmers.',
'how to use compost in farming': 'Compost can be used to enrich the soil by adding it as a top dressing or mixing it into the soil before planting. It improves soil structure, adds nutrients, and increases moisture retention.',
'what are the effects of climate change on agriculture': 'Climate change can affect agriculture through altered rainfall patterns, increased temperatures, and more frequent extreme weather events, impacting crop yields and food security.',
'what is agroforestry': 'Agroforestry is a land-use system where trees or shrubs are grown around or among crops or pastureland. This practice helps improve biodiversity, reduce erosion, and increase farm productivity.',
'how to control pests without chemicals': 'Non-chemical pest control methods include using beneficial insects, crop rotation, planting pest-resistant varieties, and practicing good sanitation in the field.',
'what is the role of bees in agriculture': 'Bees are crucial pollinators in agriculture, helping to fertilize many crops by transferring pollen from one flower to another, which leads to the production of fruits, seeds, and vegetables.',
'how to improve crop yield': 'Improving crop yield involves practices like selecting high-yield varieties, optimizing planting times, using fertilizers efficiently, and adopting precision farming techniques.',
'what are the benefits of using drones in farming': 'Drones can be used in farming for crop monitoring, mapping, spraying pesticides, and assessing crop health, making farming more efficient and precise.',
'how to manage salinity in soil': 'Managing soil salinity involves practices like applying gypsum, improving drainage, planting salt-tolerant crops, and using salt-free water for irrigation.',
'what is crop residue management': 'Crop residue management involves the use of leftover crop parts like stalks and leaves to improve soil health, reduce erosion, and maintain soil moisture.',
'how to deal with drought conditions': 'In drought conditions, use water-efficient crops, apply mulch to retain moisture, practice efficient irrigation, and reduce planting density to conserve water.',
'what are precision farming tools': 'Precision farming tools include GPS systems, soil sensors, drones, and satellite imagery, which help monitor and manage farm activities with greater accuracy.',
'how to reduce greenhouse gas emissions in farming': 'Reduce greenhouse gas emissions by adopting practices like reduced tillage, using cover crops, improving fertilizer efficiency, and integrating livestock with crop production.'

  // Add more predefined questions and answers as needed
};

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      const lowerCaseMessage = message.toLowerCase();
      const response = getResponse(lowerCaseMessage);
      setMessages([...messages, { text: message, user: 'farmer' }, { text: response, user: 'expert' }]);
      setMessage('');
    }
  };

  const getResponse = (message) => {
    if (message.startsWith('my name is')) {
      const userName = message.replace('my name is', '').trim();
      setName(userName);
      return responses['my name is'](userName);
    }
    return responses[message] || "I'm not sure how to respond to that.";
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;