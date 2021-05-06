import React, { useState } from 'react'
import { View, Text } from 'react-native'
import GroupUtilities from '../../../components/GroupUtilities'
import { Utilities } from '../../../constants/values'

let listUtilities = Object.assign([], Utilities)

export default function Utility() {
    const [utilitiesSelected, setUtilitiesSelected] = useState([...listUtilities]);
    return (
        <View>
            <GroupUtilities utilities={utilitiesSelected} updateState={(values) => setUtilitiesSelected(values)} />
        </View>
    )
}
