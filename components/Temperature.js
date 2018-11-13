import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class Note extends React.Component {
  
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
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>
          Date: {this.getTime(this.props.val.timestamp)}
        </Text>
        <Text style={styles.noteText}>
          Temperature: {this.props.val.temperature}° Celcius
        </Text>
        {/* <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>Del</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#e91e63',
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 30,
    bottom: 30,
    right: 10,
  },
  noteDeleteText: {
    color: 'white',
    fontSize: 9,
  },
});

