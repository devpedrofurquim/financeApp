import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum LoginType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const [countryCode, setCountryCode] = useState('+55');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { signIn } = useSignIn();

  const keyboardOffset = Platform.OS === 'ios' ? 80 : 0;

  const onLogin = async (type: LoginType) => {
    switch (type) {
      case LoginType.Phone:
        try {
          const fullPhoneNumber = `${countryCode}${phoneNumber}`;

          // const { supportedFirstFactors } = await signIn!.create({
          //   identifier: fullPhoneNumber,
          // });

          // const firstPhoneFactor: any = supportedFirstFactors?.find(
          //   (factor: any) => {
          //     return factor.strategy === 'phone_code';
          //   }
          // );

          // const { phoneNumberId } = firstPhoneFactor;

          // await signIn!.prepareFirstFactor({
          //   strategy: 'phone_code',
          //   phoneNumberId,
          // });

          router.push({
            //@ts-ignore
            pathname: '/verify/[phone]',
            params: { phone: fullPhoneNumber, login: String(true) },
          });
        } catch (error: any) {
          console.error(error.message);
          if (isClerkAPIResponseError(error)) {
            if (error.errors[0].code === 'form_identifier_not_found') {
              Alert.alert('Error', error.errors[0].message);
            }
          }
        }
      default:
        return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardOffset}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          onPress={() => onLogin(LoginType.Phone)}
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabledButton : styles.disabledButton,
            { marginVertical: 20 },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.lightGray,
            }}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            styles.loginButtons,
            { marginTop: 20 },
          ]}
          onPress={() => onLogin(LoginType.Email)}
        >
          <AntDesign name="mail" size={24} color="black" />
          <Text style={[defaultStyles.buttonText, { color: 'black' }]}>
            Login with email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[defaultStyles.pillButton, styles.loginButtons]}
          onPress={() => onLogin(LoginType.Google)}
        >
          <AntDesign name="google" size={24} color="black" />
          <Text style={[defaultStyles.buttonText, { color: 'black' }]}>
            Login with Google email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[defaultStyles.pillButton, styles.loginButtons]}
          onPress={() => onLogin(LoginType.Apple)}
        >
          <AntDesign name="apple1" size={24} color="black" />
          <Text style={[defaultStyles.buttonText, { color: 'black' }]}>
            Login with Apple email
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 22,
  },
  enabledButton: {
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.lightGray,
  },
  loginButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    paddingHorizontal: 40,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
});
