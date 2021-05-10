import React, { useState } from 'react';
import { useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { COLORS, FONTS, SIZES } from '../../constants';
import { CreateStep } from '../../constants/values';
import { useNavigation } from '@react-navigation/core'
import { Formik } from 'formik';
import StepOne from './components/StepOne';

const CreateProduct = () => {

    const navigation = useNavigation();
    const [step, setStep] = useState(1);

    const stepRender = useCallback(() => {

    }, [step])


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
                        <Formik
                            initialValues={
                                {
                                    roomTitle: ''
                                }
                            }
                            onSubmit={values => { console.log(values) }}
                        >

                            {
                                ({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <>
                                        <StepOne />

                                    </>
                                )
                            }
                        </Formik>


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
