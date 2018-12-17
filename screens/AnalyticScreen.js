import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, Fragment } from 'react-native';
import { Svg } from 'expo';

// import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
// import * as format from 'd3-format';
// import * as axis from 'd3-axis';

const { Path, Defs, LinearGradient, Stop } = Svg;

const d3 = {
  shape,
}

import {
  scaleTime,
  scaleLinear
} from 'd3-scale';

const height = 200;
const { width } = Dimensions.get('window');
const verticalPadding = 5;

// const data = [
//   { x: new Date(2018, 9, 1), y: 0 },
//   { x: new Date(2018, 9, 16), y: 0 },
//   { x: new Date(2018, 9, 17), y: 200 },
//   { x: new Date(2018, 10, 1), y: 200 },
//   { x: new Date(2018, 10, 2), y: 300 },
//   { x: new Date(2018, 10, 5), y: 300 },
// ];

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Temperature Analytics',
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: null,
      // minDate: null,
      // maxDate: null,
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

  getTime(unix_timestamp) {
    var date = new Date(unix_timestamp);
    var day = date.getDate();
    var month = date.getMonth() + 1; // add 1 because getMonth() is based zero function
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var formattedTime = new Date(year, month, day);
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
      //  this.convertTime(this.state.data);

      const datas = this.state.data;
      
      const Latlatss = new Promise((resolve) => {
        const dataArray = [];
        const tempArray = [];
        const dataALLLL= [];

        datas.forEach((data) => {
          const dataNew = this.getTime(data.timestamp);
          dataArray.push(dataNew);
          tempArray.push(data.temperature);
          dataALLLL.push({
            x: dataNew,
            y: data.temperature,
          });

        });
        
        const arrrr = {
          dataArray,
          tempArray,
          dataALLLL
        }
  
        resolve(arrrr);
  
      });
      
      const niHaa = Latlatss.then((arrrr) => {
        console.log("data array", arrrr.dataArray);
        const scaleX = scaleTime().domain(arrrr.dataArray).range([0, width]);
        const scaleY = scaleLinear().domain(arrrr.tempArray).range([height - verticalPadding, verticalPadding])
        const line = d3.shape.line()
          .x(d => scaleX(d.x))
          .y(d => scaleY(d.y))
          .curve(d3.shape.curveBasis)(arrrr.dataALLLL);

        return (
          <View style={styles.analyticBox}>
            <Svg style={{ width, height }}>
              <Defs>
                <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                  <Stop stopColor="#FF1A1A" offset="0%" />
                  <Stop stopColor="#FEFFFF" offset="100%" />
                </LinearGradient>
              </Defs>
              <Path d={line} fill="transparent" stroke="red" strokeWidth={2} />
              <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            </Svg>
          </View>
        );
      });

      return (
        <View style={styles.container}>
          {niHaa}
        </View>
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
  analyticBox: {
    marginTop: 60,
    marginRight: 10,
    height,
    width,
  }
})
