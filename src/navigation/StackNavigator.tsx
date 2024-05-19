import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashscreen';
import StockList from '../components/StockList';
import Bottom from '../screens/BottomScreen';
import HomeScreen from '../screens/HomeScreen';
import DescriptionScreen from '../screens/DescriptionScreen';


const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false, 
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={StockList} />
        <Stack.Screen name="Description" component={DescriptionScreen} />
    </Stack.Navigator>
  );
}