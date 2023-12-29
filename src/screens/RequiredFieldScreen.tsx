import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootStackScreenProps } from '../utils/navigators/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { SCREEN_REQUIRED } from '../utils/constants';
import { Controller, useForm } from 'react-hook-form';
import Icons from '@expo/vector-icons/MaterialIcons';
import PrimaryBtn from '../components/PrimaryBtn';

const RequiredFieldScreen = ({ navigation }: RootStackScreenProps<'RequiredFieldScreen'>) => {
  
  
  const theme = useTheme();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [units, setUnits] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    // Calculate total amount including GST (18%)
    const unitsValue = parseInt(units, 10) || 0;
    const gstPercentage = 18;
    const gstAmount = (unitsValue * gstPercentage) / 100;
    const total = unitsValue + gstAmount;
    setTotalAmount(total);
  }, [units]);

  const onChangeUnits = (value: string) => {
    setUnits(value);
  };

  const onPayPressed = () => {
    console.log('onPayPressed');
    navigation.navigate("PaymentScreen");
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ padding: 40, marginTop: 50 }}>
        {/* Required Field Title */}
        <Text style={{ fontSize: 40, fontWeight: '800' }}>{SCREEN_REQUIRED.title}</Text>
        {/* Required Field Description */}
        <Text style={{ opacity: 0.5, marginTop: 16, fontSize: 18 }}>{SCREEN_REQUIRED.description}</Text>

        <View style={{ alignItems: 'center', gap: 20, marginTop: 50 }}>
          {/* Required Units Field */}
          <Controller
            control={control}
            rules={{ required: 'Units is required' }}
            name="units"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <View style={{ position: 'relative', width: '100%' }}>
                  <TextInput
                    placeholder='Required Units' keyboardType='name-phone-pad'
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: '500',
                        color: theme.colors.text,
                        paddingLeft: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: theme.colors.background,
                        width: '100%',
                        borderWidth: 2,
                      },
                      { borderColor: error ? 'red' : '#000' },
                    ]}
                    value={value}
                    onChangeText={(text) => {
                      onChangeUnits(text);
                      onChange(text);
                    }}
                    onBlur={onBlur}
                  />
                  {/* Required Units Icon */}
                  <Icons name='charging-station' size={24} color={theme.colors.text} style={{ position: 'absolute', left: 12, top: 12, opacity: 0.5 }} />
                </View>
                {error && (
                  <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
                )}
              </>
            )}
          />

          <View style={{ backgroundColor: theme.colors.card, borderRadius: 5, borderWidth: 3, borderColor: '#000', alignItems: 'center', padding: 20, marginTop: 50, width: '100%', position: 'relative' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', paddingBottom: 20 }}>Calculation</Text>
            <Text style={{ fontSize: 18, fontWeight: '400', paddingRight: 150, paddingTop: 20 }}>Unit Cost: {units}</Text>
            <Text style={{ fontSize: 18, fontWeight: '400', paddingRight: 130, paddingTop: 20 }}>GST(18%): {((units || 0) * 18) / 100}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingRight: 100, paddingTop: 40 }}>Total: {totalAmount.toFixed(2)}</Text>

            {/* Fixed position for the 'Pay' button */}
            <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <PrimaryBtn label='Pay' onPress={handleSubmit(onPayPressed)} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RequiredFieldScreen;