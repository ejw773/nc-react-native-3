import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Directory from './DirectoryComponent'; 
import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';
import About from './AboutComponent'
import Contact from './ContactComponent'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerNavigator = () => {
  return (
      <Drawer.Navigator
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
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            title: 'Home',
            headerLeft: () => (
              <Icon 
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}   
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Directory" 
          component={Directory}
          options={({navigation}) => ({
            title: 'Directory',
            headerLeft: () => (
              <Icon 
                name='list'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
              />
            )
          })}
        />
        <Drawer.Screen 
          name="About" 
          component={About} 
          options={({navigation}) => ({
            title: 'About',
            headerLeft: () =>
              <Icon 
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
              />
          })}
        />
        <Drawer.Screen 
          name="Contact" 
          component={Contact} 
          options={({navigation}) => ({
            title: 'Contact',
            headerLeft: () =>
              <Icon 
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
              />
          })}
        />
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
          {/* <Stack.Screen 
            name='Home'
            component={Home}
            options={{
              title: 'Home',
              headerLeft: <Icon 
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                // onPress{() => NavigationContainer.toggleDrawer()}
              />
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
            name='About Us'
            component={About}
            options={{
              title: 'About Us'
            }}
          />
          <Stack.Screen 
            name='Contact Us'
            component={Contact}
            options={{
              title: 'Contact Us'
            }}
          /> */}
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

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
})

export default Main;