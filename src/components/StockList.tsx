import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import CompanyLogo from './CompanyLogo';
import SearchBar from './SearchBar';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowUp, faSearch} from '@fortawesome/free-solid-svg-icons';
import {fetchMarketTrends} from '../api-handlers/api';
import SearchStockList from './SearchStockList';
import SwipeToBuyButton from './SwipeToBuyButton';
import { useNavigation } from '@react-navigation/native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const ITEMS_PER_PAGE = 5;
const snapPoints = [SCREEN_HEIGHT * 0.6, SCREEN_HEIGHT];
const title="Lorem ipsum dolor"
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar nisl vel posuere lacinia."



const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedStocks,setSearchedStocks]= useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  const sheetRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMarketTrends();
        const data = response?.data?.trends || [];
        const stockData = data
          .filter(trend => trend.type === 'stock')
          .map(trend => ({
            name: trend.name,
            ticker: trend.symbol.split(':')[0],
            fullName: trend.name,
            price: trend.price,
            priceChange: trend.change || 0,
          }));
        setStocks(stockData);
        setFilteredStocks(stockData);
      } catch (error) {
        console.error('Error fetching market trends:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = stocks.filter(
      stock =>
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredStocks(filtered);
    setCurrentPage(0); // Reset pagination to the first page when searching
  };

  const handleSearchChange = text => {
    setSearchQuery(text);
  };

  const currentStocks = filteredStocks.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  const renderItem = ({ item }) => (
    <View>
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSingleClick(item)}
      onLongPress={() => handleLongPress(item)}
    >
      
      <View style={styles.logoContainer}>
        <CompanyLogo symbol={item.ticker} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.ticker}>{item.ticker}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
       <View>
       {expandedItem === item.ticker && (
        <TouchableOpacity onPress={() => handleLongPress(item)}>
            <FontAwesomeIcon icon={faArrowUp} color="black" style={{marginLeft:'auto'}} size={30}  />
            </TouchableOpacity>
          )}
          </View> 
        
      
    </TouchableOpacity>
    {expandedItem === item.ticker && (
      <>
      <View style={{flex:1,padding:10}}>
       <Text style={styles.bold}>{title}</Text> 
      
       <Text style={styles.smallbold}>{lorem}</Text>  
       </View> 
       </>
    )}
    </View>
  );
  
  const navigation= useNavigation();
  const handleSingleClick = (item) => {
    console.log(`Single click on ${item.ticker}`);
    navigation.navigate('Description',{item})
  };
  
  const handleLongPress = (item) => {
    console.log(`Long press on ${item.ticker}`);
    setExpandedItem((prevItem) => prevItem === item.ticker ? null : item.ticker);
  };
  
  return (
    <View style={styles.container}>
      <Button
        title="Open Bottom Sheet"
        onPress={() => sheetRef.current.snapToIndex(0)}
      />
      
      
      <SwipeToBuyButton/>
  
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
  
          {/*Search bar*/}
        <View style={styles.searchcontainer}>
          <TouchableOpacity style={styles.button}>
            <FontAwesomeIcon icon={faSearch} color="grey" style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search for Stocks"
            onChangeText={handleSearchChange}
          />
        </View>
        
  
        {searchQuery === '' && (
          <>
            <BottomSheetFlatList
              data={currentStocks}
              renderItem={renderItem}
              keyExtractor={item => item.ticker}
              contentContainerStyle={styles.bottomSheetContent}
            />
  
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
          </>
        )}
  
       
        
      </BottomSheet>
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 2, // Add elevation for shadow effect
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
  bold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  smallbold: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
  },
  logoContainer: {
    width: 80, // Adjust the width as needed
    marginRight: 20,
    justifyContent: 'center', // Center the logo vertically
  },
  textContainer: {
    flex: 1,
  },
  ticker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  bottomSheetContent: {
    backgroundColor: 'white',
  },
});

export default StockList;


 {/*searchQuery !== '' && (
          <>
        <BottomSheetFlatList
          data={currentStocks}
          renderItem={renderItem}
          keyExtractor={item => item.ticker}
          contentContainerStyle={styles.bottomSheetContent}
        />
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
          </>
        )*/}
        {/*
        
        */}