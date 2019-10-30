import React from 'react';
import { Appbar } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Text, View} from "react-native";


import { Transition } from 'react-native-reanimated';
import HomeScreen from "./screens/Home";
const defaultNavigationOptions = {
    header: (
        <Appbar.Header>
            <Appbar.BackAction
                // onPress={this._goBack}
            />
            <Appbar.Content
                title="Title"
                subtitle="Subtitle"
            />
            <Appbar.Action icon="search" onPress={() => {}} />
            <Appbar.Action icon="more-vert" onPress={() => {}} />
        </Appbar.Header>
    )
};

const AppContainer = createAppContainer(
    createAnimatedSwitchNavigator(
        {
            Home: HomeScreen,
            // Other: OtherScreen,
        },
        {
            initialRouteName: 'Home',
            defaultNavigationOptions,
            // The previous screen will slide to the bottom while the next screen will fade in
            transition: (
                <Transition.Together>
                    <Transition.Out type="slide-bottom" durationMs={400} interpolation="easeIn" />
                    <Transition.In type="fade" durationMs={500} />
                </Transition.Together>
            ),
        }
    )
);
export default AppContainer;