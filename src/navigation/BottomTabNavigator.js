
//import liraries
import { useApolloClient, useSubscription } from '@apollo/react-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useToast } from 'react-native-paper-toast';
import { COLORS, Images, SIZES } from '../constants';
import { GET_ALL_MESSAGE_ROOM, NEW_MESSAGES } from '../graphql/chat';
import { CURRENT_USER } from '../graphql/user';
import MessagesScreen from '../screens/MessagesScreen/Messages.screen';
import RentScreen from '../screens/RentScreen/Rent.screen';
import HomeStackNavigator from './stacknavigator/HomeStackNavigator';
import LikeStackNavigator from './stacknavigator/LikeStackNavigatior';
import MessagesStackNavigator from './stacknavigator/MessagesStackNavigatior';
import SettingStackNavigator from './stacknavigator/SettingStackNavigator';
const Tab = createBottomTabNavigator();

// create a component
const BottomTabNavigator = () => {
    const toaster = useToast();
    const navigation = useNavigation()

    const client = useApolloClient()
    let { user } = client.readQuery({
        query: CURRENT_USER
    })

    const { data: onMessage, error: newMessageError } = useSubscription(NEW_MESSAGES);

    console.log(user)

    useEffect(() => {

        if (newMessageError) console.log(newMessageError)

        if (onMessage) {

            let { newMessage } = onMessage
            let { chatRoom, from, to, messageBody } = newMessage;

            let label = `${from.name ? from.name : from.email} : ${messageBody}`

            let dataMessages = client.readQuery({
                query: GET_ALL_MESSAGE_ROOM,
                variables: {
                    roomID: newMessage.chatRoom
                }
            })

            if (from._id !== user._id) {
                toaster.show({
                    message: label, action: () => {
                        navigation.push('ChatList', {
                            _id: chatRoom,
                            userId: user._id,
                            to: from._id
                        })
                    }, actionLabel: 'Xem'
                })
            }

            let data = dataMessages ? dataMessages.getAllMessageOfChatRoom : []

            dataMessages && client.writeQuery({
                query: GET_ALL_MESSAGE_ROOM,
                data: {
                    getAllMessageOfChatRoom: [
                        ...data,
                        newMessage
                    ]
                },
                variables: {
                    roomID: newMessage.chatRoom
                }
            })
        }

    }, [onMessage, newMessageError])

    return (
        <>
            {<Tab.Navigator
                tabBarOptions={{
                    activeTintColor: COLORS.primary,
                    inactiveTintColor: COLORS.primaryTextColor,
                    keyboardHidesTabBar: true,
                    style: {
                        paddingVertical: SIZES.base,
                        paddingBottom: SIZES.padding,
                        height: SIZES.height / 12
                    }
                }}

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return <Image source={Images.HOME} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Settings') {
                            return <Image source={Images.SETTING} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Like') {
                            return <Image source={Images.HEART} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        if (route.name === 'Messages') {
                            return <Image source={Images.CHAT} style={{
                                tintColor: color,
                                width: 25,
                                height: 25
                            }} />;
                        }
                        return <Image source={Images.RENT} style={{
                            tintColor: color,
                            width: 25,
                            height: 25
                        }} />;
                    },
                })}


            >
                <Tab.Screen name="Home" component={HomeStackNavigator} />
                <Tab.Screen name="Like" component={LikeStackNavigator} />
                <Tab.Screen name="Rent" component={RentScreen} />
                <Tab.Screen name="Messages" component={MessagesScreen} />
                <Tab.Screen name="Settings" component={SettingStackNavigator} />
            </Tab.Navigator>}
        </>
    );
};

// define your styles


//make this component available to the app
export default BottomTabNavigator;
