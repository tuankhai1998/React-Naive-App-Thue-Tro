//import liraries
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants';

// create a component
const RadioButton = ({ data, selected, setSelected }) => {
    return (
        <>
            {data.map(({ value, label }, index) => (
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: SIZES.padding / 2,
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: index + 1 == data.length ? 0 : 1,
                    }}

                    onPress={() => setSelected(value)}
                >
                    <View
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            borderColor: COLORS.black,
                            borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {
                            value == selected && <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 16,
                                    backgroundColor: COLORS.primary
                                }}
                            ></View>
                        }
                    </View>
                    <Text
                        style={{
                            marginLeft: SIZES.padding,
                            fontSize: SIZES.body2
                        }}
                    >{label}</Text>
                </TouchableOpacity>
            ))}
        </>
    );
};

export default RadioButton;
