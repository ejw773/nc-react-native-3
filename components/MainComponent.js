import React from 'react';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerItem, DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Directory from './DirectoryComponent'; 
import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';
import About from './AboutComponent'
import Contact from './ContactComponent'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}
      >
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image source={require('./images/logo.png')}/>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>NuCamp</Text>
          </View>
        </View>
        <DrawerItemList {...props}/>
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

const drawerNavigator = () => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName='Home'
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#CEC8FF'
          },
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
            drawerIcon: () => (
              <Icon 
                name='home'
                type='font-awesome'
                size={24}
              />
            ),

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
            drawerIcon: () => (
              <Icon 
                name='list'
                type='font-awesome'
                size={24}
              />
            ),
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
            drawerIcon: () => (
              <Icon 
                name='info-circle'
                type='font-awesome'
                size={24}
              />
            ),

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
            drawerIcon: () => (
              <Icon 
                name='address-card'
                type='font-awesome'
                size={24}
              />
            ),

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
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
})

export default Main;