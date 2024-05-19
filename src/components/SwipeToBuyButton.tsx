import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faCheck, faRotateRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import notifee from '@notifee/react-native'; // Import Notifee

const SwipeToBuyButton = (Stockticker) => {
  const translateX = useSharedValue(0);
  const buttonWidth = 320;
  const releaseThreshold = 0.7; // 70% threshold
  const [buttonText, setButtonText] = useState('Swipe to Buy');
  const [buttonReleased, setButtonReleased] = useState(false);

  const gestureHandler = (event:any) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const circleStyle = useAnimatedStyle(() => {
    let translateXValue = translateX.value;
    if (buttonReleased) {
      translateXValue = buttonWidth; // Set to maximum value if released 
    }
    return {
      transform: [{ translateX: translateXValue }],
    };
  });

  const buttonContainerStyle = {
    ...styles.buttonContainer,
    backgroundColor: buttonReleased ? '#34C759' : '#FFF5D1',
  };

  const releaseButton = async () => {
    if (translateX.value >= buttonWidth * releaseThreshold) {
      console.log('Button released');
      setButtonText('Confirmed');
      setButtonReleased(true);

      // Display the notification
      await onDisplayNotification();
    } else {
      setButtonText('Swipe to Buy');
      setButtonReleased(false);
    }
    translateX.value = withSpring(0);
  };

  const resetButton = () => {
    setButtonText('Swipe to Buy');
    setButtonReleased(false);
    translateX.value = withSpring(0);
  };

 
  async function onDisplayNotification(ticker) {
    await notifee.requestPermission();
  
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  
    await notifee.displayNotification({
      title: 'Stock Purchased',
      body: `Your Purchase Order for ${ticker} is completed`,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  
  const displayNotifications = async () => {
    if (buttonReleased) {
    const stockTickers = Stockticker.ticker;
  
    for (const stock of stockTickers) {
      await onDisplayNotification(stock.ticker);
    }
  }
  };
  
  // Call the function to display notifications
  displayNotifications();

  return (
    <View style={buttonContainerStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler} onEnded={releaseButton}>
        <Animated.View style={[styles.circle, circleStyle]}>
          <FontAwesomeIcon icon={buttonReleased ? faCheck : faArrowRight} color="black" />
        </Animated.View>
      </PanGestureHandler>
      <Text style={styles.buttonText}>{buttonText}</Text>
      <TouchableOpacity onPress={resetButton} style={styles.resetButton}>
        <FontAwesomeIcon icon={faRotateRight} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
    color: 'black',
    textAlign: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 100,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeToBuyButton;
