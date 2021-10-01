import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/MainComponent'
import Directory from './components/DirectoryComponent'; 
import CampsiteInfo from './components/CampsiteInfoComponent'
import Home from './components/HomeComponent';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Directory"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5637DD'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          }
        }}
      >
        <Stack.Screen 
          name='Home'
          component={Home}
          options={{

          }}
        />
        <Stack.Screen 
          name='Directory' 
          component={Directory}
          options={{
            title: 'Directory Screen'
          }}
        />
        <Stack.Screen 
          name="Main" 
          component={Main} 
        />
        <Stack.Screen 
          name="Campsite" 
          component={CampsiteInfo} 
          options={{
            title: 'Campsite',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;