import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';

import { Card, Button, Icon } from 'react-native-elements';

import StatusIcon from './../components/Status';


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: null,
      data2: null,
      refreshing: false,
    }
  }

  componentDidMount() {
    return fetch('https://arduino-server-api.firebaseapp.com/api/status/active')
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          // isLoading: false,
          data: results,
        })
      })
      .then(() => {
        fetch('https://arduino-server-api.firebaseapp.com/api/temperatures')
          .then((res) => res.json())
          .then((results) => {
            const newResults = results.reverse();
            this.setState({
              isLoading: false,
              data2: newResults[0],
            })
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onRefresh() {
    this.setState({ isLoading: true });
    this.componentDidMount();
  }

  getTime(unix_timestamp) {
    var date = new Date(unix_timestamp);
    var day = date.getDate();
    var month = date.getMonth() + 1; // add 1 because getMonth() is based zero function
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      const dataStatus = this.state.data
            .map((val, key) => {
              return (
                <StatusIcon 
                  key={key}
                  keyval={key}
                  val={val} />
              );
            });

      return (
        <ScrollView style={styles.container}>
          {/* <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 15
            }}>
            <Image
              style={{width: 200, height: 200}} 
              source={require('../assets/images/right.png')}/>
          </View> */}
          { dataStatus }
  
          <Card title='Current Engine Temperature'>        
            <Text
              style={{margin: 20}}
              image={require('../assets/images/right.png')}>
              Engine Temperature: {this.state.data2.temperature}° Celcius
              {'\n'}Recorded Time: {this.getTime(this.state.data2.timestamp)}
            </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
              onPress={this.onRefresh.bind(this)}
              title='REFRESH STATUS' />
          </Card>
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
});
