import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CreateStep } from '../../constants/values';
import { CREATE_ROOM } from '../../graphql/room';
import StepFour from './components/StepFour';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';

const CreateProduct = () => {

    const navigation = useNavigation();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        price: {},
        address: {
            name: {

            }
        }
    });
    const [validate, setValidate] = useState(false)

    const [createRoom, { loading, error }] = useMutation(CREATE_ROOM);

    const stepRender = useCallback(() => {
        switch (step) {
            case 1: return <StepOne data={data} setData={(values) => setData(values)} setValidate={(value) => setValidate(value)} />;
            case 2: return <StepTwo data={data} setData={(values) => setData(values)} setValidate={(value) => setValidate(value)} />;
            case 3: return <StepThree data={data} setData={(values) => setData(values)} setValidate={(value) => setValidate(value)} />;
            case 4: return <StepFour data={data} setData={(values) => setData(values)} setValidate={(value) => setValidate(value)} />;
            default:
                return <StepOne data={data} setData={(values) => setData(values)} setValidate={(value) => setValidate(value)} />
        }

    }, [step, data])

    useEffect(() => {
        setValidate(false)
        return () => {
            setData({
                price: {}
            })
        };
    }, []);

    console.log({ error, loading })


    return (
        <>
            < Header title="Tạo phòng đăng" left handleLeft={() => step > 1 ? setStep(step - 1) : navigation.goBack()} />
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
