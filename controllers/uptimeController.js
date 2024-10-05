// backend/controllers/uptimeController.js
const axios = require('axios');

exports.monitorWebsite = async (req, res) => {
  const { websiteUrl } = req.body;

  try {
    const response = await axios.get(websiteUrl);
    if (response.status === 200) {
      return res.status(200).json({ status: 'UP' });
    }
    return res.status(200).json({ status: 'DOWN' });
  } catch (error) {
    return res.status(200).json({ status: 'DOWN' });
  }
};
