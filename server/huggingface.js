const express = require('express');
const { HfInference } = require('@huggingface/inference');

const router = express.Router();
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

router.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  try {
    const imageBlob = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
      parameters: {
        width: 1024,
        height: 576,
        negative_prompt: 'nsfw, nude, explicit, violence, low quality, blurry, deformed',
      }
    });
    const buffer = await imageBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

module.exports = router;
