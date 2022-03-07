import React, { Component } from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    }

    async signup() {
        try {
            let response = await fetch("http://localhost:3333/api/1.0.0/user",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify
                        (
                            {
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                email: this.state.email,
                                password: this.state.password
                            }
                        )
                });



            // sign up method 
             let res = await response.text();
            if (response.status >= 200 && response.status < 300) { //if response correct then user is signed up
            alert('sign up successful! ' + " " + res);
            this.props.navigation.navigate('Login');
            
        } else {
            // error
            alert('SOMETHING WENT WRONG' + res);
            let error = res;
            throw error;
        }
    }
    catch(error) {
    }





















    /*signup = () => {
        //Validation here...
        alert("This is working")
        //AsyncStorage.setItem('user', JSON.stringify(this.state))
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.first_name,///////////////////////////
                last_name: this.state.last_name,////////////////////////
                email: this.state.email,///////////////////
                password: this.state.password////////////////////
            })
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
                alert('YOU HAVE SIGNED UP ' + " " + res);///////////////////c
            }else if(response.status === 400){
                throw 'Failed validation';
                alert('SOMETHING WENT WRONG');
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("User created with ID: ", responseJson);
               this.props.navigation.navigate("Login");
        })
        .catch((error) => {
            console.log(error);
        })
    
     }*/

};
    render() {
            return (
                <ScrollView>
                    <TextInput
                        placeholder="Enter your first name..."
                        onChangeText={(first_name) => this.setState({ first_name })}
                        value={this.state.first_name}
                        style={{ padding: 15, borderWidth: 5, margin: 5 }}
                    />
                    <TextInput
                        placeholder="Enter your last name..."
                        onChangeText={(last_name) => this.setState({ last_name })}
                        value={this.state.last_name}
                        style={{ padding: 15, borderWidth: 5, margin: 5 }}
                    />
                    <TextInput
                        placeholder="Enter your email..."
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        style={{ padding: 15, borderWidth: 5, margin: 5 }}
                    />
                    <TextInput
                        placeholder="Enter your password..."
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry
                        style={{ padding: 15, borderWidth: 5, margin: 5 }}
                    />
                    <Button
                        title="Create an account"
                        onPress={() => this.signup()}
                    />
                </ScrollView>
            )
        }

}

export default SignupScreen;