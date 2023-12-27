import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenIndicators from '../components/ScreenIndicators';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_02 } from '../utils/constants';
import Payment from '../components/Payment';
import Icons from "@expo/vector-icons/MaterialIcons"

const Screen02 = ({navigation, }: RootStackScreenProps<"Screen02">) => {
    const theme = useTheme();
    return (
        <SafeAreaView style={{backgroundColor: theme.colors.card, flex: 1 }}>
            <View style={{paddingHorizontal: 24, height: 52, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons name='arrow-back-ios' size={24} color= {theme.colors.text} />
                </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Payment width={350} height={500} />
            </View>

            <View style={{padding: 25 }}>
                <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_02.title}</Text>
                <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18}}>{SCREEN_02.description}</Text>

                <ScreenIndicators count={4} activeIndex={1} />

                <View style={{alignItems: 'center'}}>
                    <PrimaryBtn label='Next' onPress={() => navigation.navigate("Screen03")}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Screen02