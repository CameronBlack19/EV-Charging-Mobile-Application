import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ScreenIndicators from '../components/ScreenIndicators';
import PrimaryBtn from '../components/PrimaryBtn';
import Started from '../components/Started';
import { SCREEN_04 } from '../utils/constants';
import Icons from "@expo/vector-icons/MaterialIcons"

const Screen04 = ({navigation, }: RootStackScreenProps<"Screen04">) => {
    const theme = useTheme();
    return (
        <SafeAreaView style={{backgroundColor: theme.colors.card, flex: 1 }}>
            <View style={{paddingHorizontal: 24, height: 52, alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icons name='arrow-back-ios' size={24} color= {theme.colors.text} />
                </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Started width={350} height={500} />
            </View>

            <View style={{padding: 25 }}>
                <Text style= {{fontSize: 40, fontWeight: "800",}}>{SCREEN_04.title}</Text>
                <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18}}>{SCREEN_04.description}</Text>

                <ScreenIndicators count={4} activeIndex={3} />

                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <PrimaryBtn label='Login to account' onPress={() => navigation.navigate("LoginScreen")}/>
                </View>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <PrimaryBtn label='Register with us' onPress={() => navigation.navigate("RegisterScreen")}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Screen04