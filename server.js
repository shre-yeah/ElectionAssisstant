const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Vertex AI
// NOTE: On Google Cloud (App Engine/Cloud Run), it automatically picks up the project ID and credentials.
// For local testing, ensure GOOGLE_CLOUD_PROJECT is set in .env
const project = process.env.GOOGLE_CLOUD_PROJECT || 'your-project-id';
const location = 'us-central1';

// We use try-catch to allow the app to boot even if Vertex isn't configured perfectly locally
let generativeModel;
try {
    const vertexAI = new VertexAI({ project: project, location: location });
    generativeModel = vertexAI.getGenerativeModel({
        model: 'gemini-2.5-pro',
        generationConfig: { temperature: 0.2 }
    });
} catch (error) {
    console.error("Warning: Failed to initialize Vertex AI client:", error.message);
}

// Endpoint to provide the Maps API key to the frontend
app.get('/api/maps-key', (req, res) => {
    res.json({ mapsKey: process.env.MAPS_API_KEY || '' });
});

// Endpoint for dynamic timeline
app.post('/api/timeline', async (req, res) => {
    const { lang } = req.body;
    const language = lang === 'en' ? 'English' : 'Hindi';

    if (!generativeModel) {
        return res.status(500).json({ error: "Vertex AI client is not initialized." });
    }

    const prompt = `Provide the timeline for the nearest upcoming state or general election in India in ${language}. 
    Format your response EXACTLY as a JSON array of objects, with each object having a 'title' and 'desc' field. Do not include markdown code blocks, just the raw JSON.
    Example: [{"title": "Notification", "desc": "Official announcement"}, {"title": "Polling", "desc": "Voting day"}]`;

    try {
        const resp = await generativeModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        let rawText = resp.response.candidates[0].content.parts[0].text;
        // Clean markdown code blocks if the model includes them
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

        const timelineData = JSON.parse(rawText);
        res.json(timelineData);
    } catch (error) {
        console.error("Timeline Generation Error:", error);
        res.status(500).json({ error: "Failed to generate timeline." });
    }
});

// Endpoint for chat responses
app.post('/api/chat', async (req, res) => {
    const { message, lang } = req.body;
    const language = lang === 'en' ? 'English' : 'Hindi';

    if (!generativeModel) {
        return res.status(500).json({ error: "Vertex AI client is not initialized." });
    }

    const prompt = `You are a helpful Indian Election Assistant. Answer the following question accurately in ${language}. Keep the answer relatively brief. Question: ${message}`;

    try {
        const resp = await generativeModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        const responseText = resp.response.candidates[0].content.parts[0].text;
        res.json({ reply: responseText });
    } catch (error) {
        console.error("Chat Generation Error:", error);
        res.status(500).json({ error: "Failed to generate chat response." });
    }
});

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
