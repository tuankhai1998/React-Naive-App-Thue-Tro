import { useLazyQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Yup from 'yup';
import PrimaryButton from '../../components/PrimaryButton';
import { FONTS, SIZES } from '../../constants';
import { CREATE_USER, CURRENT_USER, LOGIN } from '../../graphql/user';
import { removeStorage, setStorage } from '../../helpers/storage';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).max(50).required('Password is required!')
});
// const null = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(6).max(50).required('Password is required!'),
// });
// create a component
const LoginScreen = ({ handleLogin, token }) => {
    const [login, setLogin] = useState(true);
    const [loginQuery, { data, error }] = useLazyQuery(LOGIN);
    const [getCurrentUser, { data: currentUser, loading: currentUserLoading, error: currentUserError }] = useLazyQuery(CURRENT_USER);;
    const [createUser] = useMutation(CREATE_USER, {
        onCompleted({ createUser }) {

            console.log(createUser)
            setLogin(true)
            Alert.alert("Password đã được gửi vào mail của bạn")
        }
    })


    useEffect(() => {
        if (data) {
            let { login } = data;
            setStorage('@AHome-graphql:', login).then(() => {
                handleLogin()
            })
        }
    }, [data])

    useEffect(() => {
        if (token) {
            getCurrentUser()
        }
    }, [token])

    useEffect(() => {
        if (currentUser) {
            handleLogin()
        }
        if (currentUserError) {
            removeStorage().then(() => console.log("hahah")).catch(err => console.log(err))
        }
    }, [currentUser])

    const initialValuesLogin = {
        email: '',
        password: ''
    }

    const initialValues = {
        email: ''
    }

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {error && Alert.alert(`${error}`)}
            {currentUserError && Alert.alert(`${currentUserError}`)}
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
                            onSubmit={values => {
                                if (!login) {
                                    createUser({
                                        variables: { ...values }
                                    })
                                } else {
                                    loginQuery({
                                        variables: {
                                            email: values.email,
                                            password: values.password
                                        }
                                    })

                                }

                            }}
                        >

                            {
                                ({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <>
                                        <TextInput placeholder="Username" style={styles.textInput} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} keyboardType={"email-address"} />

                                        {login ? (
                                            <>
                                                <TextInput placeholder="Password" style={styles.textInput} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry={true} value={values.password} />
                                                <TouchableOpacity><Text style={{ color: '#ccc', fontSize: 14, marginVertical: 20 }}>Quên mật khẩu</Text></TouchableOpacity>
                                            </>
                                        )
                                            : (<View
                                                style={{
                                                    paddingHorizontal: SIZES.base
                                                }}
                                            >
                                                <Text
                                                    style={{ ...FONTS.body3, textAlign: 'center' }}
                                                >
                                                    Vui lòng nhập email của bạn
                                                </Text>
                                                <Text
                                                    style={{ ...FONTS.body3, textAlign: 'center' }}
                                                >
                                                    Password sẽ được gửi vào mail của bạn
                                                </Text>
                                            </View>)}
                                        {login ? <PrimaryButton text='Login' buttonWidth={"90%"} onclick={() => handleSubmit()} /> : <PrimaryButton buttonStyle={{ marginTop: 20 }} text='Sign up' buttonWidth={"90%"} onclick={() => handleSubmit()} />}
                                    </>
                                )
                            }
                        </Formik>


                    </View>
                </View>
                {/* {
                    login ? (<View style={{ width: SIZES.width * 3 / 4, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={[styles.borderButtonLogin, { backgroundColor: COLORS.Facebook }]}>
                            <Text style={styles.fbGoogle}>FaceBook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.borderButtonLogin, { backgroundColor: COLORS.Google }]}>
                            <Text style={styles.fbGoogle}>Google</Text>
                        </TouchableOpacity>
                    </View>) : null
                } */}

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