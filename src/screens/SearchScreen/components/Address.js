import { Ionicons } from '@expo/vector-icons'
import React, {
    useState
} from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { COLORS, FONTS, SHADOW, SIZES } from '../../../constants'
import { city as cityList } from '../../../constants/city'

export default function Address({ city }) {

    const [districtsSelected, setDistrictSelected] = useState('');
    const [wardsSelected, setWardsSelected] = useState('');

    let currentCity = city.id;
    let listCity = JSON.parse(JSON.stringify(cityList));

    let district = listCity.filter(c => c.id == currentCity)[0].districts

    const [showModalAddress, setShowModalAddress] = useState(false);

    const renderSelectAddress = (data) => {

        let renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
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
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
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
                {renderSelectAddress(district)}
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
                    onPress={() => setShowModalAddress(true)}
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
                    >Thanh Oai
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
                    >Cao Dương
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="black" />
                </TouchableOpacity>
            </View>


        </View>
    )
}
