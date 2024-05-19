import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CompanyLogo from '../components/CompanyLogo';
import SwipeToBuyButton from '../components/SwipeToBuyButton';

const DescriptionScreen = ({ route }) => {
  // Extract the item passed as a prop
  const { item } = route.params;
  const title="Lorem ipsum dolor"
   const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar nisl vel posuere lacinia."
    
   
  return (
    <View style={styles.container}>
       
         <CompanyLogo symbol={item.ticker} />
         
      
     
      <View style={styles.itemContainer}>
        <Text style={styles.bold}> {item.ticker}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bold}>${item.price}</Text>
        <Text style={styles.bold}>{title}</Text> 
        <Text style={styles.smallbold}>{lorem}</Text>    
        <SwipeToBuyButton/>   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  
  bold: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  smallbold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  normal:{
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 20,
    color:'black'
  },
  itemContainer: {

    borderColor: 'gray',
    padding: 20,
   
  },
  ticker: {
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
  },
});

export default DescriptionScreen;
