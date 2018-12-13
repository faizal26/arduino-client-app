import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator, RefreshControl } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import Temperature from './../components/Temperature';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Temperature Status',
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: null,
      refreshing: false,
    }
  }

  componentDidMount() {
    return fetch('https://arduino-server-api.firebaseapp.com/api/temperatures')
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          isLoading: false,
          data: results.reverse(),
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount()
      .then(() => {
        this.setState({ refreshing: false })
      })
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */

    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      let dataTemperatures = this.state.data
        .map((val, key) => {
          return  <Temperature
          key={key}
          keyval={key}
          val={val}/>
        })

      return (
        <ScrollView style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          { dataTemperatures }
        </ScrollView>
      );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
})
