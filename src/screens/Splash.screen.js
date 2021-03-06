//import liraries
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components';
import { COLORS, SIZES } from '../constants/theme';


// create a component
const SplashScreen = (props) => {
    const { isLoading, SetLoading } = props;


    useEffect(() => {
        if (SetLoading) {
            setTimeout(() => {
                SetLoading()
            }, 500);
        }

    }, [isLoading]);
    return (
        <Container >
            <Background
                source={require('../../assets/images/Splashbg.jpg')}
            >
                <TitleContent>
                    <View>
                        <Title>
                            find
                        </Title>
                    </View>
                    <SubTitle>
                        <Title>
                            h
                        </Title>
                        <FontAwesome name='search' color={COLORS.primary} size={50} />
                        <Title>
                            me
                        </Title>
                    </SubTitle>
                </TitleContent>

            </Background>
        </Container >
    );
};


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items : flex-end;

`

const Background = styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative
`

const TitleContent = styled.View`
    margin-bottom: 70px;
    width: ${SIZES.width * .5};
    position: absolute;
    top: ${props => props.isLoading ? '75%' : '25%'};
`

const Title = styled.Text`
    font-size: 65px;
    color: white;
    font-weight: bold;
`

const SubTitle = styled.View`
    flex-direction: row;
    position:absolute;
    top: 50px;
    left: 30%;
    align-items: center;
    justify-content: flex-end;
`



export default SplashScreen;
