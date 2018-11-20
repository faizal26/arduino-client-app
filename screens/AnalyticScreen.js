import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator, Dimensions } from 'react-native';
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

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
];

const scaleX = scaleTime().domain([new Date(2018, 9, 1), new Date(2018, 10, 5)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 300]).range([height - verticalPadding, verticalPadding])
const line = d3.shape.line()
 .x(d => scaleX(d.x))
 .y(d => scaleY(d.y))
 .curve(d3.shape.curveBasis)(data);

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Temperature Analytics',
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: null,
      minDate: null,
      maxDate: null,
    }
  }

  componentDidMount() {
    return fetch('https://arduino-server-api.firebaseapp.com/api/temperatures')
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

  // convertTime(array) {
  //   const newDate = []
  //   if (array !== null) {
  //     array.map((item) => {
  //       newDate.push(new Date(item.timestamp))
  //     })
  //   }

  //   const maxDate = new Date(Math.max.apply(null, newDate));
  //   const minDate = new Date(Math.max.apply(null, newDate));

  //   this.setState({ maxDate, minDate });
  // }

  render() {
    //  this.convertTime(this.state.data);

     return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  analyticBox: {
    marginTop: 60,
    marginRight: 10,
    height,
    width,
  }
})
