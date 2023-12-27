import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { SCREEN_HOME } from '../utils/constants';
import { Auth } from 'aws-amplify';
import PrimaryBtn from '../components/PrimaryBtn';
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';


const HomeScreen = ({navigation, }: RootStackScreenProps<"StartChargingScreen">) => {
  const theme = useTheme();

  const signOut = () => {
    Auth.signOut();
  }

  const onChargePressed = () => {
    navigation.navigate('StartChargingScreen');
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.card}}>
        <View style={{padding: 25}}>
          <Text style= {{fontSize: 40, fontWeight: "800", marginTop: 30}}>{SCREEN_HOME.title}</Text>
          
          <PrimaryBtn label='Start Charging' onPress={onChargePressed} style={{marginTop: 100}}/>

          <PrimaryBtn label='Sign Out' onPress={signOut} style={{marginTop: 50}}/>
                    
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen