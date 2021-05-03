import Images from "../Images"

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
    // {
    //     text: 'Giường',
    //     image: bed,
    //     value: 4,
    //     selected: false

    // },
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

]



export default {
    Sex,
    RoomType,
    Utilities
}

