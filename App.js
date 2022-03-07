import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import LogoutScreen from './screens/logout';
import UserProfileScreen from './screens/UserProfile';

const Stack = createStackNavigator();
const Tab = createDrawerNavigator();


function Hometabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Your profile" component={UserProfileScreen}/>
            <Tab.Screen name="Friends list" component={HomeScreen} />
            <Tab.Screen name="Add a friend" component={HomeScreen}/>
            <Tab.Screen name="Create a post" component={SignupScreen} />
            <Tab.Screen name="Settings" component={UserProfileScreen} />
            <Tab.Screen name="Logout" component={LogoutScreen}/>
        </Tab.Navigator>
    );
}

//<Stack.Screen name="Home tabs" component={Hometabs} options={{ headerShown: false }} />

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen, Hometabs}/>
                    <Stack.Screen name="Logout" component={LogoutScreen}/>
                </Stack.Navigator>

            </NavigationContainer>
        );
    }
}
export default App;