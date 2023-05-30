/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AppText from './AppText';
import { COLORS, icons } from '../constants';

interface Props {
  children: ReactNode;
  onClose?: any;
}

export default function ModalLayout({ onClose, children }: Props) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
            <View
              style={{
                alignItems: 'flex-end',
                marginBottom: 1,
                margin:15,
                marginBottom:10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: 'rgba(61, 38, 69, 0.2)',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assect/icons/close-icon.png')}
                  style={{
                    width: 8.4,
                    height: 8.4,
                  }}
                />
              </TouchableOpacity>
            </View>

            {children}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  modalView: {
    width: "100%",
    backgroundColor: "#F6F9FA",
    borderRadius: 2,
    // padding: 10,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 202
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,

  },
})