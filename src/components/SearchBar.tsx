import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SearchBar: React.FC = () => {
  return (
    <View style={styles.searchcontainer}>
      
      
      
      <TouchableOpacity style={styles.button}>
       <FontAwesomeIcon icon={faSearch} color='grey' style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search for Stocks"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding:10,
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
    margin:10
  },
});

export default SearchBar;
