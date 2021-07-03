import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import GroupUtilities from './GroupUtilities'
import { Utilities } from '../constants/values'

let listUtilities = Utilities.map(item => Object.assign({}, item))

export default function Utility({ utilitiesSelected, handleUtilitiesSelect }) {
    const [utilitiessChoose, setUtilitiesChoose] = useState([...listUtilities]);


    useEffect(() => {
        if (utilitiesSelected.length > 0 && utilitiesSelected.every(u => typeof (u) !== "number")) {
            setUtilitiesChoose(utilitiesSelected)
        }

        if (utilitiesSelected.every(u => typeof (u) == "number")) {
            let d = utilitiessChoose;
            utilitiesSelected.map((u) => {
                utilitiessChoose.map((uc, i) => {
                    if (uc.value === u) d[i].selected = true
                })
            })
            handleUtilitiesSelect(d)
        }
    }, [utilitiesSelected])


    return (
        <View>
            <GroupUtilities utilities={utilitiessChoose} updateState={(values) => handleUtilitiesSelect(values)} />
        </View>
    )
}
