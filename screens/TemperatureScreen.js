import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Card, Button, Icon } from 'react-native-elements'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Temperature Status',
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
      <ScrollView style={styles.container}>

        <Card title='All Fine'>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 15
            }}>
            <Image
              style={{width: 200, height: 200}} 
              source={require('../assets/images/right.png')}/>
          </View>
          
          <Text
            style={{marginBottom: 10, textAlign: 'center'}}
            image={require('../assets/images/right.png')}>
            Temperature value should be here: 16 Celcius
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
})
