import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SearchBar from './SearchBar'

const Traill = async () => {
   
    
  return (
    <View>
      <Text>traill</Text>
      <FontAwesomeIcon icon={faUser} />
      <SearchBar />
    </View>
  )
}

export default Traill

const styles = StyleSheet.create({})