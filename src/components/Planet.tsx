import Animated, { Easing } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import React, {useEffect, useState} from "react";
import { View } from "react-native";
import globalStyles from "../util/globalStyles";
import Flex from "./Flex";
import {Text} from "react-native-paper";

const padding = 5;
const planetSize = 15;

const {
    set,
    cond,
    startClock,
    stopClock,
    clockRunning,
    block,
    timing,
    debug,
    Value,
    Clock,
    divide,
    concat,
    spring,
    SpringUtils,
} = Animated;

export default function Mercury({ name, size, color, azimuth }) {
    const area = size + (padding * 2);
    const center = area / 2;
    const currentRotation = new Animated.Value(0);

    function runTiming(clock, value, dest) {
        const state = {
            finished: new Value(0),
            position: new Value(0),
            time: new Value(0),
            frameTime: new Value(0),
            velocity: new Value(0),
        };

        const config = {
            ...SpringUtils.makeDefaultConfig(),
            duration: 5000,
            toValue: new Value(dest),
            // easing: Easing.inOut(Easing.ease),
        };

        return block([
            cond(clockRunning(clock), 0, [
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]),
            spring(clock, state, config),
            cond(state.finished, debug('stop clock', stopClock(clock))),
            state.position,
        ]);
    }

    // Animated.useCode(
    //     // runTiming(new Clock(), currentRotation, azimuth),
    //     Animated.set(currentRotation, azimuth),
    //     [azimuth]
    // );

    useEffect(
        () => {
            // runTiming(new Clock(), 0, 180);
            currentRotation.setValue(azimuth);
        }, [azimuth]
    );
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
      <Animated.View style={[globalStyles.planet, { transform: [{ rotateZ: concat(currentRotation, 'deg') }]}]}>
        <Svg height={area + (planetSize * 2)} width={area + (planetSize * 2)}>
          <Circle cx={area/2 + planetSize / 2} cy={planetSize} r={planetSize} fill={color} />
        </Svg>
          <Text style={{ position: 'absolute', top: 0, left: '55%' }}>{name}</Text>
      </Animated.View>
    </Flex>
  );
}
