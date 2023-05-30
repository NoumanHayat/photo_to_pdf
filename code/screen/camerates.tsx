/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, PermissionsAndroid, Platform, } from 'react-native';
import Container from '../../components/Container';
import ScreenHadar from '../../components/ScreenHader';
import { COLORS } from '../../constants';
import { FloatingAction } from 'react-native-floating-action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Screen = ({ navigation }) => {
    const [filePath, setFilePath] = useState({});
    console.log(filePath);
    const actions = [
        {
            text: 'Use Camera',
            icon: <AntDesign name="camera" size={24} color="white" />,
            name: 'Use Camera',
            position: 1
        },
        {
            text: 'From Folder',
            icon: <AntDesign name="folder1" size={24} color="white" />,
            name: 'From Folder',
            position: 2
        }
    ];
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const captureImage = async type => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, response => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                setFilePath(response);
            });
        }
    };
    const chooseFile = type => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            selectionLimit:10,
            singleSelectedMode: false,
             multiple: true

        };
        launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            
            setFilePath(response);
        });
    };
    console.log(filePath);
    return (
        <Container>
            <ScreenHadar title="Photo to PDF converter" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assect/background.png')} style={{ width: 200, height: 200 }} />
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 20, color: COLORS.primary }}>No Image is selected.</Text>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginVertical: 10 }}>Please select Images using Add button.</Text>
                </View>
                
                {/* <Image source={{
                    uri: 'file:///data/user/0/com.photo_to_pdf/cache/rn_image_picker_lib_temp_ad4ac9a4-f0f6-4e21-98bc-998999e18542.jpg',
                }} style={{ width: 200, height: 200 }} /> */}

                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                        if (name == 'Use Camera') {
                            captureImage('photo')
                        }
                        if (name == 'From Folder') {
                            chooseFile('photo')
                        }
                    }}
                />
            </View>
        </Container>
    );
};

export default Screen;
