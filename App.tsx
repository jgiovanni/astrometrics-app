import React, { useState } from "react";
import { AppLoading, ScreenOrientation } from "expo";
import { Video } from 'expo-av';
import { Asset } from 'expo-asset';
import { useKeepAwake } from 'expo-keep-awake';

import { StatusBar, StyleSheet, View } from "react-native";
import { useScreens } from "react-native-screens";
import {Appbar, DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import {SafeAreaView} from "react-navigation";

import AppContainer from "./src/index";
import globalStyles from "./src/util/globalStyles";

useScreens();

const backgroundVideo = Asset.fromModule(require('./assets/background.mp4'));
const theme = {
  ...DefaultTheme,
  dark: true,
  // mode: 'exact',
  colors: {
    ...DefaultTheme.colors,
    primary: "#ea0c33",
    accent: "#ea0c33",
    text: 'white'
  }
};

async function changeScreenOrientation() {
  const landscapeMode = await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  console.log(landscapeMode)
}

export default function App() {
  useKeepAwake();
  changeScreenOrientation();

  return (
    <PaperProvider theme={theme}>
      <StatusBar hidden barStyle="light-content" />
      <Video
          style={globalStyles.video}
          source={backgroundVideo}
          volume={0}
          isLooping shouldPlay isMuted
          resizeMode="cover"
      />
      <View style={styles.container}>
        <AppContainer />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});
