import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/MainComponent'
import Directory from './components/DirectoryComponent'; 
import CampsiteInfo from './components/CampsiteInfoComponent'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Directory">
        <Stack.Screen name='Directory' component={Directory} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Campsite" component={CampsiteInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;