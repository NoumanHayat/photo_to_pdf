/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: ReactNode;
  Style?: any;
}
export default function container({  children }: Props) {
  return (

    <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
        <StatusBar backgroundColor={COLORS.primary} />
        {/* <KeyboardAwareScrollView > */}
          {children}
        {/* </KeyboardAwareScrollView> */}
    </SafeAreaView >
  );
}
