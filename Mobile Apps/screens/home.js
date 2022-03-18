import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';


class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      listData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  
    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

    getData = async () => {
        const id = await AsyncStorage.getItem('@session_id');
        const value = await AsyncStorage.getItem('@session_token');

        
    return fetch("http://localhost:3333/api/1.0.0/search", {
        'headers': {
            'X-Authorization': value
          }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
              this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            listData: responseJson 
          })
        })
        .catch((error) => {
            console.log('This is broken')
        })
  }
  
    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        //const valueId = await AsyncStorage.getItem('@session_id');
        if (value == null ) {
            this.props.navigation.navigate('login');
        }
    };



    getFriends = async () => {

        let val = await AsyncStorage.getItem('@session_token');
        let id = await AsyncStorage.getItem('@session_id')

        return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/friends', {
            method: 'GET',
            headers: {
                'X-Authorization': val
            },
        })

            .then((response) => {
                var ok = response.ok;
                if (ok) {
                    return response.text();
                }
                else {
                    alert(response.json());
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson   
                })
            })
        console.log("It doesnt output to screen")
            .catch((error) => {
                alert(error);
            })
    }

  render() {

    if (this.state.isLoading){
        return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        </View>
      );
    }else{
      return (
        <View>
          <FlatList 
                  data={this.state.listData}
                  keyExtractor={(item, index) => item.user_id.toString()}
                    renderItem={({item}) => (
                    <View>
                        <Text>{item.user_givenname} {item.user_familyname}</Text>  
                    </View>
                )}
              />
              <Button title="Your friend''s list"
                  onPress={() => this.getFriends} />

              <Text>This is working</Text>
              <Button
                  title="signout. this takes you to logout page"
                  onPress={() => this.props.navigation.navigate("Logout")}
              />
        </View>
      );
    }
  }


}
export default HomeScreen;
