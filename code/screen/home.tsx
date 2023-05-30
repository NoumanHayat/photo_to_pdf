/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, PermissionsAndroid, Platform, StyleSheet, FlatList } from 'react-native';
import Container from '../../components/Container';
import ScreenHadar from '../../components/ScreenHader';
import { COLORS } from '../../constants';
import { FloatingAction } from 'react-native-floating-action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoModalCard from '../../components/PhotoModalLayout';

const Screen = ({ navigation }) => {
    const [filePath, setFilePath] = useState([]);
    const [visible, setVisible] = useState(true);


    // console.log(filePath[0]);
    const DisplayCard = ({ item, index }) => {
        return (
            <PhotoModalCard
                onClose={() => {
                    const array = filePath;

                    if (index > -1) { // only splice array when item is found
                        array.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    console.log(array);
                    setFilePath(array);
                    setVisible(!visible);
                }}
            >
                <Image source={{ uri: item.path }} style={{ flex: 1 }} />
            </PhotoModalCard>
        )
    };
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
    return (
        <Container>
            <ScreenHadar title="Photo to PDF converter" />

            {filePath[0] === undefined ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assect/background.png')} style={{ width: 200, height: 200 }} /><View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 20, color: COLORS.primary }}>No Image is selected.</Text>
                    <Text style={{ fontSize: 12, color: COLORS.black, marginVertical: 10 }}>Please select Images using Add button.</Text>
                </View></View>) : (

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filePath}
                        renderItem={({ item, index }) => <DisplayCard item={item} index={index} />}
                        keyExtractor={(item, index) => index}
                    />
                    {/* <DisplayCard /> */}
                    {/* <DisplayCard /> 
                     <DisplayCard />  */}
                </View>
            )}


            {/* <Image source={{
                    uri: 'file:///data/user/0/com.photo_to_pdf/cache/rn_image_picker_lib_temp_ad4ac9a4-f0f6-4e21-98bc-998999e18542.jpg',
                }} style={{ width: 200, height: 200 }} /> */}

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                    if (name == 'Use Camera') {
                        ImagePicker.openCamera({
                            mediaType: 'photo',
                        }).then(image => {
                            console.log(image);
                            setFilePath([image, ...filePath]);
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                    if (name == 'From Folder') {
                        ImagePicker.openPicker({
                            multiple: true,
                            mediaType: 'photo'
                        }).then(images => {
                            console.log(images);
                            setFilePath([...images, ...filePath]);
                        }).catch(err => {
                            console.log(err);
                        })

                    }
                }}
            />
            <FloatingAction
                // actions={actions}
                position={'left'}
                name={'Continue'}
                color={'white'}
                margin={20}
                iconWidth={50}
                iconHeight={50}
                floatingIcon={require('../../assect/icons/next.png')}
                buttonSize={60}
                visible={filePath[0] != undefined}
                // onPressItem={() => {
                //     console.log('selected button');
                // }}
                onPressMain={() => {
                    console.log('selected button');
                }}
            />
        </Container>
    );
};
const styles = StyleSheet.create({

    modalView: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 2,
        // padding: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 202
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
})
export default Screen;
