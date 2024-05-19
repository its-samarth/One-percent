import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Fetch stock data function using fetch
async function fetchStockData(query) {
  console.log('Fetching stock data for query:', query);
  const url = `https://real-time-finance-data.p.rapidapi.com/search?query=${query}&language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5c36322ebcmsh8d5971958de9db0p1796d9jsn42212c96e61b',
      'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    console.log('Response received');
    const data = await response.json();
    console.log('Data fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
fetchStockData('aapl').then((res) => console.log("troa;",res)).catch((error) => console.error(error));



const SCREEN_HEIGHT = Dimensions.get('window').height;

const SearchStockList = (sku) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const handleSearch = async () => {
    console.log('Handle search called with query:', searchQuery);
    if (searchQuery.trim() !== '') {
      const data = await fetchStockData(searchQuery);
      if (data && data.length > 0) {
        console.log('Setting stocks with data:', data);
        setStocks(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      } else {
        console.log('No data found, setting empty stocks');
        setStocks([]);
        setTotalPages(0);
      }
    }
  };
 
  

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ticker}>{item.ticker}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <FontAwesomeIcon icon={faSearch} color="grey" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search for Stocks"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {stocks.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={stocks.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)}
            renderItem={renderItem}
            keyExtractor={item => item.ticker}
            contentContainerStyle={styles.flatListContent}
          />

          {stocks.length > ITEMS_PER_PAGE && (
            <View style={styles.pagination}>
              <Button
                title="Previous"
                onPress={handlePrevPage}
                disabled={currentPage === 0}
              />
              <Text>
                Page {currentPage + 1} of {totalPages}
              </Text>
              <Button
                title="Next"
                onPress={handleNextPage}
                disabled={currentPage === totalPages - 1}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    paddingHorizontal: 10,
    elevation: 2,
    width: '90%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 0,
    marginLeft: 6,
  },
  icon: {
    marginLeft: 2,
  },
  button: {
    margin: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ticker: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default SearchStockList;
