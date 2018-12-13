import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

const RightIcon = require('../assets/images/right.png');
const AlertIcon = require('../assets/images/warning.png');
const DangerIcon = require('../assets/images/danger.png');

export default class Note extends React.Component {  
  render() {
    const statusValue = this.props.val.value;

    if (statusValue === 'good') {
      iconSource = RightIcon;
    } else if (statusValue === 'warning') {
      iconSource = AlertIcon;
    } else {
      iconSource = DangerIcon;
    }

    return (
      <View key={this.props.keyval} style={styles.statusIcon}>
        <Image
          style={{width: 200, height: 200}} 
          source={iconSource}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  }
});

