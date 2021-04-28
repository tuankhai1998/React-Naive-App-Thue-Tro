//import liraries
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Slider from 'rn-range-slider';
import { COLORS, SIZES } from '../../../constants';
import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

// create a component
const PriceRate = ({ setPrice, priceRate }) => {
    const [low, setLow] = useState(priceRate.min);
    const [high, setHigh] = useState(priceRate.max);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    useEffect(() => {
        setPrice({
            min: low,
            max: high
        })
    }, [low, high])


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>
                    {low} triệu VND
                </Text>
                <Text>
                    {high} triệu VND
                </Text>
            </View>
            <View>
                <Slider
                    style={styles.slider}
                    min={0}
                    max={15}
                    step={0.5}
                    renderThumb={renderThumb}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderLabel={renderLabel}
                    renderNotch={renderNotch}
                    onValueChanged={handleValueChange}
                />
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: SIZES.width,
        padding: SIZES.padding,

    },
    root: {
        alignItems: 'stretch',
        padding: 12,
        flex: 1,
        backgroundColor: '#555',
    },
    button: {
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 12,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    valueText: {
        width: 50,
        color: 'white',
        fontSize: 20,
    },

});

//make this component available to the app
export default PriceRate;
