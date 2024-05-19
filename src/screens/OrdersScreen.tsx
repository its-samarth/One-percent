import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import CompanyLogo from '../components/CompanyLogo';
import SwipeToBuyButton from '../components/SwipeToBuyButton';
import { deleteProduct } from '../redux/ProductSlice';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
  // 'orders' is an object containing the 'products' array
  const { products } = useSelector((state: RootState) => state.product);
  console.log(products);
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch=useDispatch();
  const handleDeleteOrder = (productId:String) => {
    dispatch(deleteProduct(productId)); // Dispatch the deleteProduct action with the item ID
    //  you can navigate back to the Orders screen after deletion
    navigation.navigate('Orders' as never);
  };
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.item}>
        <View style={styles.logoContainer}>
          <CompanyLogo symbol={item.ticker} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.ticker}>{item.ticker}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={()=>handleDeleteOrder(item.id)}>
          <FontAwesomeIcon icon={faTrash} color="black" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.bold}>Open Orders</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
     
        <SwipeToBuyButton  ticker={products} />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bold: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: 'black',
  },
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    
    borderRadius: 8,
  
   
    padding: 10,
  },
  logoContainer: {
    width: 60,
    marginRight: 10,
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
    marginBottom: 5,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'black',
  },
  arrowButton: {
    marginLeft: 'auto',
  },
});

export default OrdersScreen;
