import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import GroupUtilities from '../../../components/GroupUtilities'
import { Utilities } from '../../../constants/values'

let listUtilities = Object.assign([], Utilities)

export default function Utility({ utilitiesSelected, handleUtilitiesSelect }) {
    const [utilitiessChoose, setUtilitiesChoose] = useState([...listUtilities]);
    useEffect(() => {
        if (utilitiesSelected.length > 0) {
            setUtilitiesChoose(utilitiesSelected)
        }
    }, [utilitiesSelected])


    return (
        <View>
            <GroupUtilities utilities={utilitiessChoose} updateState={(values) => handleUtilitiesSelect(values)} />
        </View>
    )
}
