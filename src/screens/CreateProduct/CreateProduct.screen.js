import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CreateStep } from '../../constants/values';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';

const CreateProduct = () => {

    const navigation = useNavigation();
    const [step, setStep] = useState(2);
    const [data, setData] = useState({
        price: {}
    });

    const stepRender = useCallback(() => {
        switch (step) {
            case 1: return <StepOne data={data} setData={(values) => setData(values)} />;
            case 2: return <StepTwo data={data} setData={(values) => setData(values)} />;
            case 3: return <StepThree data={data} setData={(values) => setData(values)} />;
            case 4: return <StepOne data={data} setData={(values) => setData(values)} />;
            default:
                return <StepOne data={data} setData={(values) => setData(values)} />
        }

    }, [step, data])

    useEffect(() => {

        return () => {
            setData({
                price: {}
            })
        };
    }, []);


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
                    <View
                        style={{

                        }}
                    >
                        {stepRender()}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                if (step < 4) {
                                    setStep(step + 1)
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
                            >Tiếp theo</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View >
        </>
    );
};


export default CreateProduct;
