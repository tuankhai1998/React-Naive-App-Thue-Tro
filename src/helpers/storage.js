import AsyncStorage from "@react-native-async-storage/async-storage"

export const getStorage = async () => {
    try {
        let data = await AsyncStorage.getItem("@AHome-graphql:")

        return JSON.parse(data)?.token
    } catch (error) {
        console.log(error)
    }
}

export const setStorage = async (name, data) => {
    try {
        await AsyncStorage.setItem(name, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}


export const removeStorage = async () => {
    try {
        await AsyncStorage.removeItem("@AHome-graphql:")
    } catch (error) {
        console.log(error)
    }
}

