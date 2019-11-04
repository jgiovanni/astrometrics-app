import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const globalStyles = StyleSheet.create({
  safeAreaContainer: {
    display: "flex",
    flex: 1
  },
  screenContainer: {
    display: "flex",
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    // margin: 20,
    backgroundColor: 'rgba(0, 0, 0, .76)'
  },
  video: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  solarSystem: {
    position: 'relative',
    // backgroundColor: 'rgba(255, 0, 0, .33)'
  },
  planetContainer: {
    position: 'absolute',
    width: '100',
    height: '100',
    // backgroundColor: 'rgba(0, 255, 0, .33)',
  },
  planet: {
    position: 'absolute',
  },
  planetTrack: {

  }
});

export default globalStyles;
