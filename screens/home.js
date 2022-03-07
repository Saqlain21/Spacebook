import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//const Tab = createBottomTabNavigator();// need to insert tab navigator

/*const doneData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@session_token')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.error(e);
    }
}*/


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
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };


    

        

 
        
   









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
                renderItem={({item}) => (
                    <View>
                        <Text>{item.user_givenname} {item.user_familyname}</Text>  
                    </View>
                )}
                keyExtractor={(item,index) => item.user_id.toString()}
              />

              <Text>This is working</Text>
              <Button
                  titl="signout. this takes you to logout page"
                  onPress={() => this.props.navigation.navigate("Logout")}
              />
        </View>
      );
    }
  }


}



export default HomeScreen;
