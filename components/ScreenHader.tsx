/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { COLORS } from '../constants';
export default function ScreenHeader({title, style }: any) {
  return (
    <View
      style={{
        // height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginBottom:10,
        ...style,
        backgroundColor: COLORS.primary,
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('Press')
          // navigation.goBack();
        }}
        style={{
          height: 45,
          width: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <Image
          source={icons.back}
          style={{
            tintColor: COLORS.dark,
            height: 22,
            width: 11,
            position: 'absolute',
          }}
        /> */}
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          marginLeft: -45,
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
          }}>
          {title}
        </Text>
      </View>
      <View></View>
    </View>
  );
}
