
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FriendsScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            otherFriends: [],
            Friendrequests: [],
            FriendsList: []
        }
    }

    componentDidMount() {
        this.getFriends();
        this.getUsers();
        this.getFriendRequest();
    }


    getUsers = async () => {
        let val = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@session_id')

        return fetch("http://localhost:3333/api/1.0.0/search", {
            method: 'GET',
            headers: {
                'X-Authorization': val,
            }
        })
            .then((response) => {
        
                if (response.status === 200) {
                    return response.json();
                }
                else if (response.status === 400) {
                    alert('Not wkring');
                }
                else {
                    alert('something went wrong');
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    otherFriends: responseJson// this should workkkkkkkkk
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    SendRequest = async (id) => {
        let val = await AsyncStorage.getItem('@session_token');
        //let id = await AsyncStorage.getItem('@session_id')
        console.log(id);
        return fetch("http://localhost:3333/api/1.0.0/user/" + id + "/friends", {
            method: 'POST',
            headers: {
                'X-Authorization': val,
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    alert('successfull');
                }
                else if (response.status === 400) {
                    alert('Bad request');
                }
                else if (response.status === 403) {
                    alert('Request has already been sent')
                }
                else {
                    alert('something went wrong');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getFriends = async () => {
        let val = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@session_id')
        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/friends', {
            method: 'GET',
            headers: {
                'X-Authorization': val,
            }
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
                else if (response.status === 404) {
                    throw 'got no friends'
                }
                else {
                    alert('something went wrong');
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    FriendsList: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getFriendRequest = async () => {

        let val = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@session_id')

        return fetch("http://localhost:3333/api/1.0.0/friendrequests",
            {
                method: 'GET',
                headers: {
                    'X-Authorization': val,
                }
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    return response.json();
                }
                else if (response.status === 400) {
                    alert('Bad request');
                }
                else {
                    alert('something went wrong');
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    Friendrequests: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //accept 
    AcceptRequest = async (id) => {

        let val = await AsyncStorage.getItem('@session_token');
        //let id = await AsyncStorage.getItem('@session_id')
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + id,
            {
                method: 'POST',
                headers: {
                    'X-Authorization': val,
                }
            })
            .then((response) => {
               
                if (response.status === 200) {
                    this.getFriendRequest();
                    return response.json();
                }
                else if (response.status === 400) {
                    alert('NIT WORKINGGGGG');
                }
                else {
                    alert('something went wrong');
                }
            })
            .catch((error) => {
                console.log(error)
            })


    }

    //this should be wokringgggg
    DeclineRequest = async (id) => {
        let val = await AsyncStorage.getItem('@session_token');
        //let id = await AsyncStorage.getItem('@session_id')
        
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + id,
            {
                method: 'DELETE',
                headers: {
                    'X-Authorization': val,
                }
            })
            .then((response) => {               
                if (response.status === 200) {
                    this.getFriendRequest();
                    return response.json();
                }
                else if (response.status === 400) {
                    alert('NOT working');
                }
                else {
                    alert('something went wrong');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <View style={style.Friend}>
                    <Text style={style.FriendTitle}> Current Friends List </Text>
                    <FlatList
                        data={this.state.FriendsList}
                        renderItem={({ item }) =>
                        (
                            <View style={{ flexDirection: 'row' }}>
                                <View sytle={{ alignItems: 'flex-start' }}>
                                    <Text>{'-----'} {item.user_givenname} {item.user_familyname}{'-----'}</Text>
                                    <Text>{item.email}</Text>
                                </View>
                                <View sytle={{ alignItems: 'flex-end' }}>
                                </View>
                            </View>



                        )}

                        keyExtractor={(item, index) => item.user_id}
                    />
                </View>

                <View style={style.Friend}>
                    <Text style={style.FriendTitle}> Friend Requests </Text>
                    <Text> You have no friend requests</Text>
                    <FlatList
                        data={this.state.Friendrequests}
                        renderItem={({ item }) =>
                        (
                            <View>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <Text>{item.email}</Text>
                                <Button
                                    title="Accept"
                                    onPress={() => this.AcceptRequest(item.user_id)}
                                />
                                <Button
                                    title="Decline"
                                    onPress={() => this.DeclineRequest(item.user_id)}
                                />
                            </View>
                        )}

                        keyExtractor={(item, index) => item.user_id}
                    />
                </View>

                <View style={style.Friend}>
                    <Text style={style.FriendTitle}>Add friends </Text>
                    <FlatList
                        data={this.state.otherFriends}
                        renderItem={({ item }) =>
                        (
                            <View style={style.fixToText}>
                                <Text>{item.user_givenname} {item.user_familyname}</Text>
                                <Text>{item.user_email}</Text>
                                <Button style={style.fixToText}
                                    title='Send Friend Request'
                                    onPress={() => this.SendRequest(item.user_id)}
                                />
                            </View>
                        )}

                        keyExtractor={(item, index) => item.user_id}
                    />
                </View>

            </View>
        );
    }
}


const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'left',
        },

        Friend:
        {

            margin: 10,
            alignItems: 'left',
            justifyContent: 'left',
        },

        FriendTitle:
        {
            fontFamily: 'sans-serif-medium',
            fontSize: 15,
            fontWeight: 'bold',
            alignItems: 'center',
            justifyContent: 'center',
        },

    }
)
export default FriendsScreen;
