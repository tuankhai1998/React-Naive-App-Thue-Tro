import { DefaultTheme } from "react-native-paper";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const containerWidth = width - 2 * 24;

export const COLORS = {
    // base colors
    primary: "#a6c13c", // Green
    secondary: "#ff784f",  // Orange
    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lineGreen: "#daf46d",
    lineOrange: "#ffa97c",
    lightGray: "#ABAFB8",
    lightGray2: "#EFEFF0",
    lightGray3: '#D4D5D6',
    gray: "#BEC1D2",
    blue: '#42B0FF',
    darkGreen: '#749100',
    darkOrange: "#c64824",
    darkGray: '#898C95',
    transparentLightGray: '#CCD4D5D6',
    transparentLightGray1: 'rgba(255,255,255,0.7)',
    Facebook: "#3b5998",
    fireOpal: '#F25F5C',
    Google: "#db3236",
    primaryTextColor: "rgba(0,0,0,0.6)",
    darkSecondaryTextCode: "rgba(255,255,255,0.8)"

};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height,
    containerWidth
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body4, lineHeight: 22 },
};

export const SHADOW = {
    shadow1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
}

const theme = {
    ...DefaultTheme,
    fonts: {
        regular: {
            fontFamily: "Montserrat-Regular",
        }
    },
    colors: {
        ...DefaultTheme.colors,
        primary: '#a6c13c',
        accent: 'yellow',
    },

};


export default theme