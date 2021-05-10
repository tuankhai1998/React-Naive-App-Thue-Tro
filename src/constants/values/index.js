import Images from "../Images"
import { COLORS } from "../theme"

export const Sex = [
    { value: 0, label: 'Tất cả' },
    { value: 1, label: 'Nam' },
    { value: 2, label: 'Nữ' },
]

export const RoomType = [
    { label: 'Phòng cho thuê', value: 1 },
    { label: 'Căn hộ cho thuê', value: 2 },
    { label: 'Chung cư thuê', value: 3 },
    { label: 'Ở ghép', value: 4 },
]


export const Utilities = [
    {
        text: 'Điều hòa',
        image: Images.CONDITIONE,
        value: 1,
        selected: false
    },
    {
        text: 'WC riêng',
        image: Images.BATHROOM,
        value: 2,
        selected: false

    },
    {
        text: 'An ninh',
        image: Images.SECURITY,
        value: 3,
        selected: false

    },
    {
        text: 'Thứ cưng',
        image: Images.PET,
        value: 4,
        selected: false

    },
    {
        text: 'Tự do',
        image: Images.TIME,
        value: 5,
        selected: false

    },
    {
        text: 'Máy giặt',
        image: Images.WHASHINGMACHINE,
        value: 6,
        selected: false

    },
    {
        text: 'Internet',
        image: Images.WIFI,
        value: 7,
        selected: false

    },
    {
        text: 'Cửa sổ',
        image: Images.WINDOW,
        value: 8,
        selected: false

    },
    {
        text: 'Ban công',
        image: Images.BALCONY,
        value: 9,
        selected: false

    },

]


export const CreateStep = [
    {
        text: 'Thông tin phòng',
        color: COLORS.Google,
        
    },
    {
        text: 'Địa chỉ',
        color: COLORS.secondary
    },
    {
        text: 'Tiện ích',
        color: COLORS.Facebook
    },
    {
        text: 'Xác nhận',
        color: COLORS.primary
    }

]



export default {
    Sex,
    RoomType,
    Utilities,
    CreateStep
}

