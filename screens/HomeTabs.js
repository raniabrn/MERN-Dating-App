import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-dynamic-vector-icons';
// components
import TabBarIcon from '../components/TabBarIcon';
import images from '../services/Images';
import ProfileScreen from './ProfileScreen';
import MatchesScreen from './MatchesScreen';
import MessagesScreen from './MessagesScreen';
import SearchScreen from './SearchScreen';
import DrawerScreen from './DrawerScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// The home main menu that contains the bottom tab navigator
const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? images.profilHommeActif : images.profilHomme;
          } else if (route.name === 'Recherche') {
            iconName = focused ? images.rechercheActif : images.recherche;
          } else if (route.name === 'Drawer') {
            iconName = focused ? images.menuIconActif : images.menu;
          } else if (route.name === 'Messages') {
            iconName = focused ? images.messagesActif : images.messages;
          } else if (route.name === 'Compatibles') {
            iconName = focused ? images.matchActif : images.match;
          }
          return route.name === 'Drawer' ? (
            <TabBarIcon
              pathIcon={iconName}
              onPressTab={() => navigation.openDrawer()}
            />
          ) : (
            <TabBarIcon
              pathIcon={iconName}
              onPressTab={() => navigation.navigate(route.name)}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#7D938A',
          // backgroundColor: '#6D6E67',
          height: 60,
        },
      }}>
      <Drawer.Screen name="Drawer" component={DrawerScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Your profile' }}
      />
      <Tab.Screen name="Recherche" component={SearchScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Compatibles" component={MatchesScreen} />
    </Tab.Navigator>
  );
};

export default Home;
