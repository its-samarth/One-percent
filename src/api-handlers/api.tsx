export async function fetchMarketTrends() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ef3cdf7ec2mshba4ad12f836f6e8p12859cjsnc52024f45ab9',
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

  export async function fetchStockData(query) {
    const url = `https://real-time-finance-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&language=en`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5c36322ebcmsh8d5971958de9db0p1796d9jsn42212c96e61b',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  