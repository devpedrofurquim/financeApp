import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';

type RouteParams = {
  phone: string;
  login: string;
};

const Phone = () => {
  const { phone, login } = useLocalSearchParams<RouteParams>();
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const [code, setCode] = useState('');

  useEffect(() => {
    console.warn(phone);
    if (code.length === 6) {
      if (login === 'true') {
        verifyLogin();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = () => {};

  const verifyLogin = () => {};

  return (
    <View>
      <Text>{phone}</Text>
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({});
