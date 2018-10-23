import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import { Card, Button, Icon } from 'react-native-elements';


export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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

        <Card title='Current Engine Temperature'>        
          <Text
            style={{marginTop: 20, marginBottom: 20, textAlign: 'center'}}
            image={require('../assets/images/right.png')}>
            Engine Temperature: 16° Celcius
            {'\n'}Recorded Time: 22/10/2018
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
            title='REFRESH STATUS' />
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
});
