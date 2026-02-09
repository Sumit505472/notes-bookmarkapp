const axios = require('axios');
const cheerio = require('cheerio');

// Fetch metadata from URL (title from HTML)
exports.fetchMetadata = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(response.data);
    const title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';

    return title.trim();
  } catch (error) {
    console.log('Failed to fetch metadata:', error.message);
    return '';
  }
};
