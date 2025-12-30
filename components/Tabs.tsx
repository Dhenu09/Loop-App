import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import Activity from '../app/(tabs)/activity';
import Feed from '../app/(tabs)/feed';
import Profile from '../app/(tabs)/profile';
import Search from '../app/(tabs)/search';
import Sell from '../app/(tabs)/sell';


import TabBarStyles from '../components/TabBarStyles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarStyle: route.name === 'Sell' 
        ? { display: 'none' }  
        : TabBarStyles.container,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'rgba(156, 163, 175, 1)',
      tabBarIcon: ({ focused }) => {
        if (route.name === 'Sell') {
          return (
              <Image
                source={require('../assets/selllogo.png')}
                style={{
                  width: 34,
                  height: 34,
                  resizeMode: 'contain',
                  tintColor: focused ? 'rgba(250, 61, 80, 1)' : 'rgba(250, 61, 80, 1)',
                }}
              />
            );
          } else if (route.name === 'Feed') {
            return (
              <Image
                source={require('../assets/feedlogo.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? 'black' : 'rgba(156, 163, 175, 1)',
                }}
              />
            );
          }else if (route.name === 'Profile') {
            return (
              <Image
                source={require('../assets/Profilelogo.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? 'black' : 'rgba(156, 163, 175, 1)',
                }}
              />
            );
          }else if (route.name === 'Activity') {
            return (
              <Image
                source={require('../assets/Activitylogo.png')}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: 'contain',
                  tintColor: focused ? 'black' : 'rgba(156, 163, 175, 1)',
                }}
              />
            );
          }

          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? 'black' : '#999'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Sell" component={Sell} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
