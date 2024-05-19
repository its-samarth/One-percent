import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import StockList from '../components/StockList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetComponent = () => {
  const sheetRef = useRef(null);

  // Define snap points as percentages of the screen height
  const snapPoints = [SCREEN_HEIGHT * 0.6, SCREEN_HEIGHT];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => sheetRef.current?.snapToIndex(0)}>
        <Text>Open Bottom Sheet</Text>
        
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        index={0} 
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.contentText}>This is a Bottom Sheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BottomSheetComponent;
