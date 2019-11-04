import React, { useEffect, useState } from "react";
import { Appbar, DefaultTheme, FAB, Portal, Text } from "react-native-paper";
import { View, DatePickerIOS } from "react-native";
import { SafeAreaView } from "react-navigation";
import globalStyles from "../util/globalStyles";
import Flex from "../components/Flex";
import { ScreenOrientation } from "expo";
import SolarSystem from "../components/SolarSystem";
import ParticleAPI from "../util/particleAPI";

const Astronomy = require("astronomy-engine/astronomy.js");
const particleAPI = new ParticleAPI();
const minimumDate = new Date("1700-11-29T14:17:31.000Z");
const maximumDate = new Date("2200-11-29T14:17:31.000Z");
const planets = {
  inner: ["Mercury", "Venus", "Earth", "Mars"],
  outer: ["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
  other: ["Sun", "Moon"]
};

function HomeScreen() {
  const [openFab, setOpenFab] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [solarSystem, setSolarSystem] = useState({});

  const handleDateChange = (val = new Date()) => {
    setChosenDate(val);

    let planetPositions = {};
    for (let body of Astronomy.Bodies) {
      if ([...planets.outer, ...planets.other].includes(body)) continue;
      const vector = Astronomy.HelioVector(body, val);
      const { elat, elon } = Astronomy.Ecliptic(vector.x, vector.y, vector.z);
      // elat: angle relative to z plane, elon: location around the sun on xy place
      planetPositions[body] = { ...vector, polar: elat, azimuth: elon };
    }
    setSolarSystem(planetPositions);
    // send data to photon API
    particleAPI.sendData('newPositions', JSON.stringify(planetPositions))

  };

  useEffect(() => {
    handleDateChange();
  }, []);

  return (
    <View style={globalStyles.screenContainer}>
      <Flex center full column>
        <Flex full flex={2} center>
          <SolarSystem data={solarSystem} />
        </Flex>
        <Flex full flex={1} center>
          <Flex
            style={{
              backgroundColor: "rgba(255, 255, 255, .66)",
              borderRadius: 10
            }}
          >
            <DatePickerIOS
              mode="date"
              date={chosenDate}
              onDateChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              style={{ flex: 1 }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Portal>
        <FAB.Group
          visible
          open={openFab}
          icon={openFab ? "close" : "plus"}
          theme={{ colors: { text: DefaultTheme.colors.text } }}
          actions={[
            {
              icon: "star",
              label: "Star",
              onPress: () => console.log("Pressed star")
            },
            {
              icon: "email",
              label: "Email",
              onPress: () => console.log("Pressed email")
            },
            {
              icon: "bell",
              label: "Remind",
              onPress: () => console.log("Pressed notifications")
            }
          ]}
          onStateChange={({ open }) => setOpenFab(open)}
          onPress={() => {
            if (openFab) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </View>
  );
}

export default HomeScreen;
