import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/react-hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CreateStep } from '../../constants/values';
import { CREATE_ROOM, CURRENT_ROOM } from '../../graphql/room';
import { USER_INFO } from '../../graphql/user';
import StepFour from './components/StepFour';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';

const CreateProduct = () => {

    const navigation = useNavigation();
    const [step, setStep] = useState(1);
    const [dataStep1, setDataStep1] = useState({
        price: {}
    })
    const [dataStep2, setDataStep2] = useState({
        address: {
            name: {},
            loc: {}
        }
    })
    const [dataStep3, setDataStep3] = useState({})
    const [dataStep4, setDataStep4] = useState({})
    const route = useRoute();
    const { params } = route;


    const client = useApolloClient();
    const dataUser = client.readQuery({
        query: USER_INFO
    })

    const [validate, setValidate] = useState(false)

    const [createRoom, { loading, error }] = useMutation(CREATE_ROOM, {
        onCompleted: () => {
            navigation.push('Dashboard')
        }
    });

    const stepRender = useCallback(() => {
        switch (step) {
            case 1: return <StepOne data={dataStep1} setData={(values) => setDataStep1(values)} setValidate={(value) => setValidate(value)} />;
            case 2: return <StepTwo data={dataStep2} setData={(values) => setDataStep2(values)} setValidate={(value) => setValidate(value)} />;
            case 3: return <StepThree data={dataStep3} setData={(values) => setDataStep3(values)} setValidate={(value) => setValidate(value)} />;
            case 4: return <StepFour data={dataStep4} setData={(values) => setDataStep4(values)} setValidate={(value) => setValidate(value)} address={dataStep2} />;
            default:
                return <StepOne data={dataStep1} setData={(values) => setDataStep1(values)} setValidate={(value) => setValidate(value)} />
        }

    }, [step, dataStep1, dataStep2, dataStep3, dataStep4])

    useEffect(() => {
        setDataStep4({ phone: dataUser?.user?.phone ? dataUser?.user?.phone : '' })
    }, [dataUser]);

    useEffect(() => {
        setValidate(false)
        if (params?.idRoom) {
            let dataRoom = client.readQuery({
                query: CURRENT_ROOM,
                variables: {
                    idRoom: params.idRoom
                }
            })

            let { sex, type, roomNum, acreage, peoples, price, address, images, utilities } = dataRoom.room

            console.log("data room", dataRoom.room)
            setDataStep1({ sex, type, roomNum, acreage, peoples, price })
            setDataStep2({ address })
            setDataStep3({ images, utilities, update: true })
        }
    }, []);

    const renderError = React.useCallback(() => {
        let messageError = "";
        if (error) {
            messageError = error.message
        }
        if (messageError) {
            return (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}
                >
                    <MaterialIcons name="error-outline" size={40} color={COLORS.Google} />
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.body3,
                            color: COLORS.Google
                        }}
                    >{messageError}</Text>
                </View>
            )
        }
    }, [error])

    return (
        <>
            <Header title="Tạo phòng đăng" left handleLeft={() => step > 1 ? setStep(step - 1) : navigation.goBack()} />
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                backgroundColor: COLORS.lightGray2
            }}>
                <View
                    style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        width: SIZES.width,
                        height: SIZES.height / 15,
                        backgroundColor: COLORS.white,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    {error && renderError()}
                    {
                        CreateStep.map((item, index) => {
                            if (index == step - 1) {
                                return <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: item.color
                                    }}
                                >
                                    {item.text}
                                </Text>
                            } else {
                                return <View
                                    style={{
                                        width: SIZES.body3,
                                        height: SIZES.body3,
                                        borderRadius: SIZES.body3 / 2,
                                        backgroundColor: item.color
                                    }}
                                >
                                </View>
                            }
                        })
                    }

                </View >
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View>
                        {loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : stepRender()}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                if (!validate) {
                                    Alert.alert("Thông báo lỗi", "Bạn phải nhập đủ thông tin")
                                }

                                if (step < 4 && validate) {
                                    setStep(step + 1)
                                }
                                if (step == 4 && validate) {

                                    let data = { ...dataStep1, ...dataStep2, ...dataStep3, ...dataStep4 };
                                    const { utilities } = data;
                                    let utilitiesFormat = utilities.filter(item => {
                                        if (item.selected) {
                                            return item.value
                                        }
                                    }).map(item => item.value)
                                    console.log({ ...data, utilities: utilitiesFormat })

                                    createRoom({
                                        variables: {
                                            ...data,
                                            utilities: utilitiesFormat
                                        }
                                    })
                                }
                            }}
                            style={{
                                backgroundColor: COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                padding: SIZES.padding * 2 / 3,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                }}
                            >{step == 4 ? 'Hoàn thành' : 'Tiếp theo'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View >
        </>
    );
};


export default CreateProduct;
