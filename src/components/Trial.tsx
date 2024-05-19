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

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

// import all the components we are going to use
import {SafeAreaView, View, Text, ToastAndroid, StyleSheet} from 'react-native';

import SwipeButton from 'rn-swipe-button';
const thumbIcon=<FontAwesomeIcon icon={faArrowRight} />
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example of React Native Swipe Button
        </Text>
        <SwipeButton
          disabled={false}
          //disable the button by doing true (Optional)
          swipeSuccessThreshold={70}
          height={45}
          //height of the button (Optional)
          width={330}
          //width of the button (Optional)
          title="Swipe to Submit"
          //Text inside the button (Optional)
          //thumbIconImageSource={thumbIcon}
          //You can also set your own icon for the button (Optional)
          onSwipeSuccess={() => {
            alert('Submitted Successfully!');
          }}
          //After the completion of swipe (Optional)

          railFillBackgroundColor="green" //(Optional)
          //railFillBorderColor="green" //(Optional)
          thumbIconBackgroundColor="white" //(Optional)
          thumbIconBorderColor="white" //(Optional) white arrow button
          railBackgroundColor="#fff5d2" //(Optional) golden background
          
        />
      </View>
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});




  /*
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  {sheetRef.current && sheetRef.current.index === 1 && <SearchBar />}
  */