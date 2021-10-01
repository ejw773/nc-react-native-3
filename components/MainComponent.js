import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Main = ({ navigation }) => {
    console.log(navigation);
    return (
      <View style={styles.viewStyle}>
        <Text>Home Screen</Text>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    viewStyle: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export default Main;