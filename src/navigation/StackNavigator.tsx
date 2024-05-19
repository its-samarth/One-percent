import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashscreen';
import StockList from '../screens/StockList';

import DescriptionScreen from '../screens/DescriptionScreen';
import OrdersScreen from '../screens/OrdersScreen';


const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false, 
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="List" component={StockList} />
        <Stack.Screen name="Description" component={DescriptionScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}