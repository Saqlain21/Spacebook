import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@session_token', jsonValue)
        await AsyncStorage.setItem('@session_id', jsonValue)
    } catch (e) {
        console.error(error);
    }

}

const cssStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
    },
    customBtn: {
        /*marginTop: 10,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",*/
        color: "#20232a",
        /*textAlign: "center",
        fontSize: 10,
        fontWeight: "bold"*/
    }
});


class LoginScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }
 
    login = async () => {
        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
                /*({
                email: this.state.email,
                password: this.state.password
            }),*/
        })


        .then((response) => {
            if(response.status === 200){
                return response.json()
            } else if (response.status === 400) {
                alert("Enter a valid email or password");
                throw 'Invalid email or password';
            }else{
                throw 'Something went wrong';
            }
        })
        .then(async (responseJson) => {
            console.log(responseJson);
            storeData(responseJson)
            await AsyncStorage.setItem('@session_token', responseJson.token);
            await AsyncStorage.setItem('@session_id', responseJson.id);
                this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }


    render(){
        return (
            <ScrollView>
                <TextInput
                    placeholder="Enter your email..............................."
                    //onChangeText={this.handleEmailInput}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:50, borderWidth:10, margin:5}}
                />
                <TextInput
                    placeholder="Enter your password............................."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:50, borderWidth:10, margin:5}}
                />
                <Button
                    title="Login"
                    onPress={this.login}
                    style={cssStyleSheet.customBtn}// not working
                    //color= "#20232a"
                />
                <Button
                    title="Don't have an account?"
                    color="darkgreen"
                    onPress={() => this.props.navigation.navigate("Signup")}
                />
            </ScrollView>
        )
        
    }

    
}

export default LoginScreen;