import React, { useState } from "react";
import {Appbar, DefaultTheme, FAB, Portal, Text} from "react-native-paper";
import { View, DatePickerIOS } from "react-native";
import {SafeAreaView} from "react-navigation";
import globalStyles from "../util/globalStyles";
import Flex from "../components/Flex";
import {ScreenOrientation} from "expo";
const Astronomy = require('astronomy-engine/astronomy.js');
// import Astronomy from 'astronomy-engine'
const minimumDate = new Date('1700-11-29T14:17:31.000Z');
const maximumDate = new Date('2200-11-29T14:17:31.000Z');
function HomeScreen() {
    const [openFab, setOpenFab] = useState(false);
    const [chosenDate, setChosenDate] = useState(new Date());
    
    const handleDateChange = (val) => {
        console.log(val);
        setChosenDate(val);

        console.log(Astronomy.Bodies);
        for (let body of Astronomy.Bodies) {
            const vector = Astronomy.HelioVector(body, val);
            const ecliptical = Astronomy.Ecliptic(vector.x, vector.y, vector.z);
            console.log(body, ecliptical);
        }
    };

    return (
        <View style={globalStyles.screenContainer}>
            <Flex center full>
                <Flex full flex={1} center>
                    <Text>Testing 123</Text>
                </Flex>
                <Flex full flex={1} center>
                    <Flex style={{ backgroundColor: 'rgba(255, 255, 255, .66)', borderRadius: 10 }}>
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
                    theme={{ colors: { text: DefaultTheme.colors.text}}}
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
