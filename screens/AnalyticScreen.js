import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { Svg } from 'expo';
import Temperature from './../components/Temperature';

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

const height = 150;
const { width } = Dimensions.get('window');
const verticalPadding = 5;

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
      newData: null,
      maxTemperature: null,
      line: null,
      refreshing: false,
    }
  }

  async componentDidMount() {
    const response = await fetch('https://arduino-server-api.firebaseapp.com/api/temperatures');
    const json = await response.json();

    this.setState({ 
      data: json.reverse(),
    })
    
    return this.manageData();
  }

  async assignData() {
    const data = this.state.newData.reverse();
    const minimumDate = this.state.newData[0].x;
    const maximumDate = this.state.newData[9].x; 
    const maximumTemperature = this.state.maxTemperature;

    const scaleX = scaleTime().domain([minimumDate, maximumDate]).range([0, width]);
    const scaleY = scaleLinear().domain([0, maximumTemperature]).range([height - verticalPadding, verticalPadding])
    const line = d3.shape.line()
      .x(d => scaleX(d.x))
      .y(d => scaleY(d.y))
      .curve(d3.shape.curveBasis)(data);
    this.setState({
      line,
      isLoading: false,
    })
  }

  async manageData() {
    const dataArray = this.state.data;

    const formattedData = await dataArray.map((dataObject) => {
      const newDate = this.getTime(dataObject.timestamp);
      const formattedData = {
        x: newDate,
        y: dataObject.temperature,
      }
      return formattedData;
    })

    const temperatureData = await dataArray.map((dataObject) => {
      return dataObject.temperature;
    })

    const maxTemperature = await Math.max(...temperatureData);
    this.setState({
      maxTemperature,
    })

    this.setState({
      newData: formattedData,
      maxTemperature,
    });

    return this.assignData();
  }

  getTime(unix_timestamp) {
    var date = new Date(unix_timestamp);
    var seconds = "0" + date.getSeconds();
    var minutes = "0" + date.getMinutes();
    var hours = date.getHours();
    var day = date.getDate();
    var month = date.getMonth() + 1; // add 1 because getMonth() is based zero function
    var year = date.getFullYear();

    var formattedTime = new Date(year, month, day, hours, minutes, seconds);
    return formattedTime;
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount()
      .then(() => {
        this.setState({ refreshing: false })
      })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    } else {
      // console.log('max temperature:', this.state.maxTemperature);
      // console.log('new data:', this.state.newData);
      let dataTemperatures = this.state.data
        .map((val, key) => {
          return  <Temperature
          key={key}
          keyval={key}
          val={val}/>
        })

      return (
        <View style={styles.container}>
          <View style={styles.analyticBox}>
            <Svg style={{ width, height }}>
              <Defs>
                <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
                  <Stop stopColor="#FF1A1A" offset="0" />
                  <Stop stopColor="#FEFFFF" offset="60" />
                </LinearGradient>
              </Defs>
              <Path d={this.state.line} fill="transparent" stroke="red" strokeWidth={2} />
              <Path d={`${this.state.line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            </Svg>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)} />
          }>
            { dataTemperatures }
          </ScrollView>
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
    marginTop: 0,
    marginRight: 10,
    height,
    width,
  }
})
