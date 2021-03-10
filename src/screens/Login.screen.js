import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, SIZES } from '../constants/theme';



// create a component
const LoginScreen = () => {
    const [login, setLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const navigation = useNavigation();

    const initialValuesLogin = {
        email: '',
        password: ''
    }

    const initialValues = {
        email: '',
        password: '',
        retypePassword: ''
    }


    const { colors } = useTheme();

    const handleLogin = async () => {
        if (userName && passWord) {
            if (loginUser.login) {
                alert('Tên đăng nhập hoặc mật khẩu sai ')
            }
        } else {
            alert('Bạn phải nhập đủ tên đăng nhập và mật khẩu')
        }
    }

    const handleSignUp = async () => {
        if (userName && passWord && retypePassword) {
            if (passWord === retypePassword) {
                let user = await {
                    email: userName,
                    password: passWord
                }
                setLogin(true)
            } else {
                alert('nhập lại password')
            }
        } else {
            alert('Bạn phải nhập đủ tên đăng nhập và mật khẩu')
        }
    }




    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'https://divui.com/blog/wp-content/uploads/2016/11/nha-hang-bangkok-view-dep.jpg' }} style={styles.background} >
                <View style={{ position: 'absolute', top: '30%', left: '10%' }}>
                    <Text style={{ fontSize: 40, color: '#fff', fontFamily: "Roboto-Bold" }}>Welcome</Text>
                    <Text style={{ color: '#fff', width: SIZES.width * 3 / 4 }}>It is a long established fact that a reader will be distracted by the</Text>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, alignItems: "center" }}>


                <View style={styles.login}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity
                            onPress={() => setLogin(true)}>
                            <Text style={[styles.loginHeader, login ? { color: colors.primary } : styles.unActive]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setLogin(false)}>
                            <Text style={[styles.loginHeader, login ? styles.unActive : { color: colors.primary }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 3, justifyContent: 'center', alignItems: 'center' }}>

                        <Formik
                            initialValues={login ? initialValuesLogin : initialValues}
                            onSubmit={values => console.log(values)}
                        >

                            {
                                ({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <>
                                        <TextInput placeholder="Username" style={styles.textInput} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} keyboardType={"email-address"} />
                                        <TextInput placeholder="Password" style={styles.textInput} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry={true} value={values.password} />
                                        {login ? (<TouchableOpacity><Text style={{ color: '#ccc', fontSize: 14, marginVertical: 20 }}>Quên mật khẩu</Text></TouchableOpacity>)
                                            : (<TextInput
                                                placeholder="Retype password"
                                                style={styles.textInput}
                                                secureTextEntry={true}
                                                onChangeText={handleChange('retypePassword')}
                                                onBlur={handleBlur('retypePassword')}
                                                value={values.retypePassword}
                                            />)}
                                        {login ? <PrimaryButton text='Login' buttonWidth={"90%"} onclick={() => handleSubmit()} /> : <PrimaryButton text='Sign up' buttonWidth={"90%"} onclick={() => handleSubmit()} />}
                                    </>
                                )
                            }
                        </Formik>


                    </View>
                </View>
                {
                    login ? (<View style={{ width: SIZES.width * 3 / 4, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={[styles.borderButtonLogin, { backgroundColor: COLORS.Facebook }]}>
                            <Text style={styles.fbGoogle}>FaceBook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.borderButtonLogin, { backgroundColor: COLORS.Google }]}>
                            <Text style={styles.fbGoogle}>Google</Text>
                        </TouchableOpacity>
                    </View>) : null
                }

            </View>
        </View >
    );
}


export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    background: {
        width: SIZES.width,
        height: SIZES.height / 3,
        position: 'relative'
    },
    login: {
        width: 3 * SIZES.width / 4,
        height: 3 * SIZES.height / 6,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -40,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        width: "90%",
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: '#e3eaf1'

    },
    loginHeader: {
        fontSize: 30,
        fontWeight: 'bold',

        textTransform: 'uppercase',
        marginHorizontal: 10,
        marginVertical: 5
    },
    unActive: {
        fontSize: 20, color: '#ccc'
    },
    fbGoogle: { color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 13 },
    borderButtonLogin: { width: "45%", borderRadius: 50, justifyContent: "center", height: 50, alignItems: 'center' }

})