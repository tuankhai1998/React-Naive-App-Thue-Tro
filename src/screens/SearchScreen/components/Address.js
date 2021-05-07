import { Ionicons } from '@expo/vector-icons'
import React, {
    useState, useEffect
} from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants'
import { city as cityList } from '../../../constants/city'

export default function Address({ city, setAddress }) {

    const [districtsSelected, setDistrictSelected] = useState('Tất Cả');
    const [wardsSelected, setWardsSelected] = useState('Tất Cả');
    const [isDistrict, setIsDistrict] = useState(true);


    let currentCity = city.id;
    let listCity = JSON.parse(JSON.stringify(cityList));

    let districts = listCity.filter(c => c.id == currentCity)[0].districts;
    let wardsOfDistrict = districts?.filter(district => district.name == districtsSelected)[0]?.wards

    useEffect(() => {
        if (districtsSelected == "Tất Cả") setAddress({ districts: '', wardsAndStreet: '' });
        else if (wardsSelected == "Tất Cả") setAddress({ districts: districtsSelected, wardsAndStreet: '' });
        else setAddress({ districts: districtsSelected, wardsAndStreet: wardsSelected });
    }, [districtsSelected, wardsSelected])

    useEffect(() => {
        setWardsSelected('Tất Cả')
    }, [districtsSelected])

    const [showModalAddress, setShowModalAddress] = useState(false);

    const renderSelectAddress = (data) => {

        let renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setDistrictSelected(item.name)
                        setShowModalAddress(false)
                    }}
                    key={`${item.name}_${index}`}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            paddingVertical: SIZES.base
                        }}
                    >{item.name}</Text>
                </TouchableOpacity>
            )
        }

        let renderItemWards = ({ item, index }) => {
            return (
                <TouchableOpacity
                    key={`${item.name}_${index}`}
                    onPress={() => {
                        setWardsSelected(item.name)
                        setShowModalAddress(false)
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            paddingVertical: SIZES.base
                        }}
                    >{item.name}</Text>
                </TouchableOpacity>
            )
        }


        return <>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}
                underlayColor="rgba(0,0,0,0)"
            >
                <View
                    style={{
                        width: SIZES.width - SIZES.padding * 2,
                        borderRadius: SIZES.radius,

                        maxHeight: SIZES.height * 3 / 4,
                        ...SHADOW.shadow1,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: SIZES.height / 3,
                        }}
                    >
                        <FlatList
                            data={[{ name: "Tất Cả" }, ...data]}
                            renderItem={({ item, index }) => {
                                if (isDistrict) return renderItem({ item, index })
                                return renderItemWards({ item, index })
                            }}
                        />
                    </View>

                </View>

            </View>
        </>
    }

    return (
        <View
            style={{
                paddingVertical: SIZES.padding
            }}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalAddress}
                onRequestClose={() => {
                    setShowModalAddress(!showModalAddress);
                }}
            >
                {isDistrict ? renderSelectAddress(districts) : wardsOfDistrict ? renderSelectAddress(wardsOfDistrict) : renderSelectAddress([])}
            </Modal>
            <View
                style={{
                    flexDirection: 'row',
                    width: SIZES.width - SIZES.padding * 2,
                    alignItems: 'center',
                    marginBottom: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body3,
                        width: SIZES.width / 3
                    }}
                >Quận/Huyện : </Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalAddress(true)
                        setIsDistrict(true)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,

                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.base / 2,
                            textAlign: 'center',
                            width: (SIZES.width - SIZES.padding * 4) * 2 / 3
                        }}
                    >{districtsSelected}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    width: SIZES.width - SIZES.padding * 2,
                    alignItems: 'center',
                    marginBottom: SIZES.padding
                }}
            >
                <Text
                    style={{
                        ...FONTS.body3,
                        width: SIZES.width / 3
                    }}
                >Phường/Xã : </Text>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalAddress(true)
                        setIsDistrict(false)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: COLORS.black,
                        borderBottomWidth: 1,

                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            paddingHorizontal: SIZES.padding,
                            paddingVertical: SIZES.base / 2,
                            textAlign: 'center',
                            width: (SIZES.width - SIZES.padding * 4) * 2 / 3
                        }}
                    >{wardsSelected}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>


        </View>
    )
}
