const axios = require('axios');

exports.generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        },
        responseType: 'arraybuffer'
      }
    );

    res.set({ 'Content-Type': 'image/png' });
    res.send(response.data);
  } catch (e) {
    res.status(500).send("Image generation error: " + e.message);
  }
};
