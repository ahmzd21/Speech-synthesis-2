const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

router.post("/text-to-speech", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Text to convert:", text); // Log the text being converted

    const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Sarah's voice
    const API_KEY = process.env.ELEVENLABS_API_KEY;

    const response = await axios({
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      responseType: 'arraybuffer'
    });

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // Generate unique filename
    const filename = `speech_${Date.now()}.mp3`;
    const filepath = path.join(uploadsDir, filename);

    // Save the audio file
    const buffer = Buffer.from(response.data);
    fs.writeFileSync(filepath, buffer);

    // Send back the file URL
    res.json({
      success: true,
      message: "Speech generated successfully",
      audioUrl: `/uploads/${filename}`
    });

  } catch (error) {
    console.error("Error in text-to-speech:", error); // Log the entire error object
    res.status(500).json({
      success: false,
      message: "Error generating speech",
      error: error.message // Send back the error message
    });
  }
});

module.exports = router;