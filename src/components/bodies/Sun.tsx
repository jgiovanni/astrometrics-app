import Svg, { Circle } from "react-native-svg";
import React from "react";
import Animated from "react-native-reanimated";

export default function Sun() {
  return (
    <Animated.View>
      <Svg height="100" width="100">
        <Circle cx="50" cy="50" r="50" fill="yellow" />
      </Svg>
    </Animated.View>
  );
};
