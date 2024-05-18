import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Text, Rect, LinearGradient, Stop } from 'react-native-svg';


const SplashScreen = () => {
    const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
        navigation.replace('List');// Navigate to the main screen
      console.log('Navigate to main screen');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Rect x="0" y="0" width="100%" height="100%" fill="black" />
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0.3" stopColor="#E0CE8F" stopOpacity="0.6" />
          <Stop offset="2.7" stopColor="#F9F4E1" stopOpacity="1" />
        </LinearGradient>
        <Text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="120"
          fontWeight="bold"
          fill="url(#grad)"
        >
          1
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
