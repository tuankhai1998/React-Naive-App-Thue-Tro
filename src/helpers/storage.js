import AsyncStorage from "@react-native-async-storage/async-storage"

export const getStorage = async () => {
    try {
        let data = await AsyncStorage.getItem("@AHome-graphql:")
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}
