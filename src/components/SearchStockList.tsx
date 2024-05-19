import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { fetchStockData } from '../api-handlers/api';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CompanyLogo from './CompanyLogo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

const SearchStockList = ({ query }: { query: string }) => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);
  const ITEMS_PER_PAGE = 5;
  const title="Lorem ipsum dolor"
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar nisl vel posuere lacinia."

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() !== '') {
        try {
          const data = await fetchStockData(query);
          if (data && data.data && data.data.stock.length > 0) {
            const stockData = data.data.stock.map(stock => ({
                ...stock,
                ticker: stock.symbol.split(':')[0]
              }));
            setStocks(stockData);
            setTotalPages(Math.ceil(stockData.length / ITEMS_PER_PAGE));
          } else {
            setStocks([]);
            setTotalPages(0);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setStocks([]);
          setTotalPages(0);
        }
      }
    };

    handleSearch();
  }, [query]);

  

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
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleSingleClick = (item:any) => {
    console.log(`Single click on ${item.ticker}`);
    navigation.navigate('Description',{item})
  };
  
  const handleLongPress = (item:any) => {
    console.log(`Long press on ${item.symbol}`);
    setExpandedItem((prevItem) => (prevItem === item.symbol ? null : item.symbol));
  };
  

const renderItem = ({ item }: { item: any }) => (
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
       {expandedItem === item.symbol && (
        <TouchableOpacity onPress={() => handleLongPress(item)}>
            <FontAwesomeIcon icon={faArrowUp} color="black" style={{marginLeft:'auto'}} size={30}  />
            </TouchableOpacity>
          )}
          </View> 
        
      
    </TouchableOpacity>
    {expandedItem === item.symbol && (
      <>
      <View style={{flex:1,padding:10}}>
       <Text style={styles.bold}>{title}</Text> 
      
       <Text style={styles.smallbold}>{lorem}</Text>  
       </View> 
       </>
    )}
    </View>
  );

  
  return (
    <View style={styles.listContainer}>
      {stocks.length > 0 && (
        <>
          <BottomSheetFlatList
            data={stocks.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)}
            renderItem={renderItem}
            keyExtractor={(item) => item.symbol}
            contentContainerStyle={styles.flatListContent}
          />
          {stocks.length > ITEMS_PER_PAGE && (
            <View style={styles.pagination}>
              <Button title="Previous" onPress={handlePrevPage} disabled={currentPage === 0} />
              <Text>
                Page {currentPage + 1} of {totalPages}
              </Text>
              <Button title="Next" onPress={handleNextPage} disabled={currentPage === totalPages - 1} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  flatListContent: {
    paddingHorizontal: 20,
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
    padding: 10,
  },
});

export default SearchStockList;
