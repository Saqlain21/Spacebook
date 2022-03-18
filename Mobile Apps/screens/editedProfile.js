import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';


class EditProfileScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            updatedfirstname: '',
            updatedlastname: '',
            updatedEmail: '',
            updatedPassword: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

  
    // update the user info
    updatedUserInfo = async () => {
        let val = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@session_id')
        let update = {
            first_name: this.state.updatedfirstname,
            last_name: this.state.updatedlastname,
            email: this.state.updatedEmail,
            password: this.state.updatedPassword
        }

        return fetch("http://localhost:3333/api/1.0.0/user/" + id, {
            method: 'PATCH',
            headers: {
                'X-Authorization': val,
            },

            body: JSON.stringify(update)

        })
            .then((response) => {
               
                if (response.status === 200) {
                    alert("Update success " + JSON.stringify(update));// this is working 
                    return response.json();
                }
                else if (response.status === 400) {
                    alert("Update something");
                   
                }
                else {
                    alert('Not working');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <View>

                <View>
                    <TextInput
                        
                        type="text"
                        text={this.state.firstname}
                        placeholder= "Firstname"
                        onChangeText={text => this.setState({ firstname: text })}

                    />
                </View>

                <View>
                    <TextInput
                       
                        type="text"
                        onChangeText={text => this.setState({ lastname: text })}
                        placeholder="Surname"
                    />
                </View>

                <View>
                    <TextInput
                        
                        type="text"
                        onChangeText={text => this.setState({ email: text })}
                        placeholder="Email"
                    />
                </View>

                <View >
                    <TextInput
                        
                        onChangeText={text => this.setState({ passwordU: text })}
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                </View>
                <Pressable onPress={() => { this.updatedUserInfo() }}>
                    <Text>Update</Text>
                </Pressable>
            </View>
        );
    }
}
export default EditProfileScreen;


