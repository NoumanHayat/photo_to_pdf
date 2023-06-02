/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Container from '../../components/Container';
import ScreenHadar from '../../components/ScreenHader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppInput from '../../components/AppInput';
import { RadioButton } from 'react-native-paper';
import AppButton from '../../components/AppButton';
import { useData } from '../hooks';
import AppInputNumber from '../../components/AppInputNumber';
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

const Screen = (props) => {
    const navigation = props.navigation;
    const [checked, setChecked] = React.useState('false');
    const { ConvertApi,Test } = useData();
    const [data, setData] = React.useState(props.route.params);
    const [title, setTitle] = React.useState('Default Title');
    const [emailAddress, setEmailAddress] = React.useState('null');
    const [width, setWidth] = React.useState(500);
    const [height, setHeight] = React.useState(500);

    return (
        <Container>
            <ScreenHadar title="Photo to PDF converter" />
            <View style={{ margin: 20, flex: 0.8 }}>
                <KeyboardAwareScrollView>


                    <Text style={{ color: 'gray' }}>Title of Document</Text>
                    <AppInput onChangeText={(e) => { e == '' ? setTitle('Default Title') : setTitle(e) }} defaultValue={'Title of the document (Optional)'} />
                    <Text style={{ color: 'gray', marginVertical: 15 }}>Do you also want to send document through email?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{color:'gray'}}>Yes</Text>
                            <RadioButton
                                value="true"
                                status={checked === 'true' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('true')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{color:'gray'}}>No</Text>
                            <RadioButton
                                value="false"
                                status={checked === 'false' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('false')}
                            />
                        </View>
                    </View>
                    {checked === 'true' ? (<View>

                        <Text style={{ color: 'gray' }}>Enter your email</Text>
                        <AppInput onChangeText={(e) => { setEmailAddress(e) }} defaultValue={'Enter your email'} />
                    </View>) : <Text></Text>}



                    {/* <Image source={{ uri:  'file:///data/user/0/com.photo_to_pdf/cache/react-native-image-crop-picker/7d7a1a74-8aa1-45bf-80b7-ebb42ee0e9e5.jpg',}} style={{ width:100,height:100 }} /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25 }}>
                        <View>
                            <Text style={{ color: 'gray' }}>Image Width</Text>
                            <AppInputNumber onChangeText={ (e) => {
                                if (e == '') { setWidth(500) } else {
                                    const numberRegex = /^[0-9\b]+$/;
                                    if (numberRegex.test(e)) {
                                        setWidth(e);
                                    } else {
                                        Alert.alert('please enter a number Only');
                                    }

                                }
                            }} defaultValue={'500'} inputStyles={undefined} />
                        </View>
                        <View>
                            <Text style={{ color: 'gray' }}>image Height</Text>
                            <AppInputNumber onChangeText={(e) => {
                                if (e == '') { setHeight(500) } else {
                                    const numberRegex = /^[0-9\b]+$/;
                                    if (numberRegex.test(e)) {
                                        setHeight(e);
                                    } else {
                                        Alert.alert('please enter a number Only');
                                    }

                                }
                            }} defaultValue={'500'} inputStyles={undefined} />
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
            <View style={{ flex: 0.15, margin: 40 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <AppButton
                        onPress={() => {
                            ConvertApi();
                            // if (checked === 'true') {
                                
                            //     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                            //     if (emailRegex.test(emailAddress)) {
                            //         ConvertApi(data,title,checked,emailAddress,width,height);
                            //     } else {
                            //         Alert.alert('incorrect Email Address');
                            //     }
                            // } else {
                            //      ConvertApi(data,title,checked,emailAddress,width,height);
                            // }
                        }}
                        text="Convert"
                        style={{
                            width: '100%',
                            marginTop: 30
                        }}
                        textStyle={{ color: 'white', letterSpacing: 2 }}
                    />
                </View>
            </View>
        </Container>
    );
};
export default Screen;
