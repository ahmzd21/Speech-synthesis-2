async function testApi() {
    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          text: "Hello, this is a test.",
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        {
          headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
          }
        }
      );
  
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      console.error("Request Headers:", error.config.headers); // Log the request headers
      console.error("Request Data:", error.config.data); // Log the request data
    }
  }