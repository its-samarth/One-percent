export async function fetchMarketTrends() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0e26da93b6msh66d4dda36d76120p117fbfjsn047d9d1b9c8f',
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

  export async function fetchStockData(query:string) {
    const url = `https://real-time-finance-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&language=en`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0e26da93b6msh66d4dda36d76120p117fbfjsn047d9d1b9c8f',
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
  