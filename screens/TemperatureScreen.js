import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  componentDidMount() {
    return fetch('https://to-do-app-api.firebaseapp.com/api/notes')
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          isLoading: false,
          data: results,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  } 

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Text>Hello World</Text>
    );
  }
}
