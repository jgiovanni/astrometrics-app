import Animated from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import React from "react";
import { View } from "react-native";
import globalStyles from "../../util/globalStyles";
import Flex from "../Flex";

const padding = 5;
const planetSize = 15;
export default function Mercury({ size }) {
    const area = size + (padding * 2);
    const center = area / 2;
  return (
    <Flex center style={[globalStyles.planetContainer, { width: area, height: area }]}>
      <Svg height={area} width={area}>
        <Circle
          cx={center}
          cy={center}
          r={center}
          fill="transparent"
          stroke="rgba(255, 255, 255, .33)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={5}
        />
      </Svg>
      <Animated.View style={[globalStyles.planet, { top: -planetSize }]}>
        <Svg height={planetSize * 2} width={planetSize * 2}>
          <Circle cx={planetSize} cy={planetSize} r={planetSize} fill="red" />
        </Svg>
      </Animated.View>
    </Flex>
  );
}
