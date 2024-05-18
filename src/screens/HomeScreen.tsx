import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheetComponent from './BottomScreen'
import StockList from '../components/StockList'

const HomeScreen = () => {
  return (
    <View style={{flex:1}}>
     
      <StockList/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})