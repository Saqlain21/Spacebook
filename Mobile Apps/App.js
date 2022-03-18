import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';



import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import LogoutScreen from './screens/logout';
import UserProfileScreen from './screens/UserProfile';
import UserPostScreen from './screens/UserPosts';
//import CameraScreen from './screens/Camera';
import FriendsScreen from './screens/UserFriendRequests';
import getPostScreen from './screens/getPost';
//import EditprofileScreen from './screens/Editprofile';
import EditprofileScreen from './screens/editedProfile';

const Stack = createStackNavigator();
const Tab = createDrawerNavigator();


function Hometabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Your profile" component={UserProfileScreen} />
            <Tab.Screen name="User list" component={HomeScreen} />
            <Tab.Screen name="Add a friend" component={FriendsScreen}/>
            <Tab.Screen name="Create a post" component={UserPostScreen} />
            <Tab.Screen name="View your posts" component={getPostScreen} />
            <Tab.Screen name="Logout" component={LogoutScreen}/>
        </Tab.Navigator>
    );
}


class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen, Hometabs}/>
                    <Stack.Screen name="Logout" component={LogoutScreen} />
                    <Stack.Screen name="Edit profile" component={EditprofileScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default App;
