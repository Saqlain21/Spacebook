import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const doneData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@session_token')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.error(e);
    }
}


class HomeScreen extends Component {
    render() {

        
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>test inut</Text>
                </View>
            );
        } 
            
        

    }






export default HomeScreen;
// JavaScript source code
