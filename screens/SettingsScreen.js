import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, AsyncStorage, ActivityIndicator, RefreshControl } from 'react-native';

// import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Configuration Info',
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    AsyncStorage.getItem("myKey").then((value) => {
      this.setState({"myKey": value})
    });

    AsyncStorage.getItem("deviceToken").then((value) => {
      this.setState({"deviceToken": value})
    })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Text style={styles.saved}>
          Username: {this.state.myKey}
        </Text>
        <View>
          <TextInput 
            style={styles.formInput}
            onChangeText={(text) => this.saveData(text)}
          />
          <Text style={styles.instructions}>
            Type something to update username.
          </Text>
        </View>
        <View style={{borderWidth: 1, margin: 30, padding: 10}}>
          <Text style={styles.configInfo}>
            Local Device Token: {this.state.deviceToken}
          </Text>
          <Text style={styles.configInfo}>
            Server Device Token: ??
          </Text>
          <Text style={styles.configInfo}>
            Arduino ID: ??
          </Text>
        </View>
      </View>      
    );
  }

  saveData(value) {
    AsyncStorage.setItem("myKey", value);
    this.setState({"myKey": value});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  formInput: {
    height: 30,
    marginTop: 30,
    margin: 10,
    marginBottom: 0,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 1
  },
  saved: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  configInfo: {
    color: '#333333',
  }
})
