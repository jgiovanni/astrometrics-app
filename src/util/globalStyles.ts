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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    // margin: 20,
    backgroundColor: 'rgba(0, 0, 0, .66)'
  },
  video: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
  }
});

export default globalStyles;
