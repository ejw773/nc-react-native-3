import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Directory from './DirectoryComponent'; 
import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';

const Stack = createNativeStackNavigator();

const Main = () => {
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

export default Main;