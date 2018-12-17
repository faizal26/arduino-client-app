import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const height = 200;
const { width } = Dimensions.get('window');

export default class Analytics extends React.Component {  

  render() {
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

