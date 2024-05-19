
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigation/StackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StockList from './src/screens/StockList';
import { Provider } from 'react-redux';
import { MyStore } from './src/redux/Store';


export default function App() {
  return (
    <Provider store={MyStore}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    </GestureHandlerRootView>
    </Provider>
  );
}

/*

*/