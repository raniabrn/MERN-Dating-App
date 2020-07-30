import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Local Imports
// screens
import LoginScreen from './screens/LoginScreen';
import DrawerScreen from './screens/DrawerScreen';
import Settings from './screens/Settings';
import EditProfile from './screens/EditProfile';
// components
import { StateProvider, store } from './components/store';
import Home from './screens/HomeTabs';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={Home}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerStyle: { backgroundColor: '#fd5098' } }}
      />
      <RootStack.Screen
        name="Edit profile"
        component={EditProfile}
        options={{ headerStyle: { backgroundColor: '#fd5098' } }}
      />
    </RootStack.Navigator>
  );
};
const App = () => {
  //const [switchValue, setSwitchValue] = useState(false);
  const [username, setUsername] = useState(null);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const globalState = useContext(store);

  return globalState['signedIn'] ? (
    <StateProvider>
      <NavigationContainer style={styles.container}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerScreen {...props} />}>
          <Drawer.Screen name="Home" component={RootStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StateProvider>
  ) : (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Sign In">
            {(props) => (
              <View>
                <LoginScreen
                  isSignedIn
                  spinnerEnable
                  spinnerVisibility={spinnerVisibility}
                  onPressLogin={() => {
                    setSpinnerVisibility(true);
                    setTimeout(() => {
                      setSpinnerVisibility(false);
                    }, 4000);
                    globalState['signedIn'] = true;
                  }}
                  usernameOnChangeText={(username) => setUsername(username)}
                  onPressSettings={() => alert('Settings Button is pressed')}
                  passwordOnChangeText={(password) =>
                    console.log('Password: ', password)
                  }
                />
              </View>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
  // <StatusBar barStyle="light-content" />
  // {/*
  //  params
  //  */}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
