import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import PrimaryBtn from '../components/PrimaryBtn';
import { SCREEN_PAYMENT } from '../utils/constants';

const PaymentScreen = ({ navigation }: RootStackScreenProps<'PaymentScreen'>) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ padding: 30, marginTop: 50 }}>
        {/* Payment Title */}
        <Text style={{ fontSize: 40, fontWeight: '800' }}>{SCREEN_PAYMENT.title}</Text>
        {/* Payment Description */}
        <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18 }}>{SCREEN_PAYMENT.description}</Text>

        {/* Payment using GPay  */}
        <View style={{marginTop: 50}}>
              <PrimaryBtn label='Pay using Google Pay' />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;