import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Directory from './DirectoryComponent'; 
import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerNavigator = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Directory" component={Directory} />
      </Drawer.Navigator>
  )
}

const Main = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Drawer"
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
            name='Drawer'
            component={drawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Home'
            component={Home}
            options={{
              title: 'Home'
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