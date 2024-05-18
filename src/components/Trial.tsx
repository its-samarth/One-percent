export async function fetchMarketTrends() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5c36322ebcmsh8d5971958de9db0p1796d9jsn42212c96e61b',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
  
    const params = new URLSearchParams({
      trend_type: 'GAINERS',
      country: 'us',
      language: 'en'
    });
  
    try {
      const response = await fetch(`https://real-time-finance-data.p.rapidapi.com/market-trends?${params}`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch market trends');
      }
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  
  // Usage example
  async function getData() {
    try {
      const marketTrendsData = await fetchMarketTrends();
      console.log(marketTrendsData);
      // Handle the data as needed
    } catch (error) {
      console.error(error);
      // Handle errors
    }
  }
  


/*


const axios = require('axios');

async function fetchMarketTrends() {
  const options = {
    method: 'GET',
    url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
    params: {
      trend_type: 'GAINERS',
      country: 'us',
      language: 'en'
    },
    headers: {
      'X-RapidAPI-Key': '5c36322ebcmsh8d5971958de9db0p1796d9jsn42212c96e61b',
      'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Usage example
async function getData() {
  try {
    const marketTrendsData = await fetchMarketTrends();
    console.log(marketTrendsData);
    // Handle the data as needed
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

*/