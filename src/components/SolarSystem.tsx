import React, {useEffect, useState} from "react";
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import Flex from "./Flex";
import {View} from "react-native";
import Sun from "./bodies/Sun";
import Planet from "./Planet";
import globalStyles from "../util/globalStyles";

const planetOptions = {
    Mercury: { size: 200, color: '#B5A7A7' },
    Venus: { size: 300, color: '#DDD8D4' },
    Earth: { size: 400, color: '#8CB1DE' },
    Mars: { size: 500, color: '#663926' },
};

export default function SolarSystem ({data}: ISolarSystem) {
    useEffect(
        () => {
            if (Object.keys(data).length > 0) {
                console.log('data: ', data);
            }
        },
        [data]
    );

    return (
        <Flex full center style={globalStyles.solarSystem}>
            <Sun/>
            {
                Object.keys(data).map(key => {
                    const planet = data[key];
                    console.log(planet, key);
                    return (
                        <Planet key={key} {...planetOptions[key]} {...planet} />
                    )
                })
            }
        </Flex>
    );
}