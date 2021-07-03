import { gql } from "@apollo/client";

export const FETCH_ROOM = gql`
    query ($page: Int, $per_page:Int, $query: roomSearch, $sortBy:[sortBy]){
        rooms (page: $page, per_page: $per_page, sortBy :$sortBy, query : $query ){
            _id
            type
            images
            roomNum
            phone 
            roomName
            description
            address{
                name{
                    city
                    wardsAndStreet
                    districts
                }
                loc{
                    coordinates
                }
            }
            price {
                room{
                    free
                    price
                }
            }
            createdAt
        }
    }
`;

export const CURRENT_ROOM = gql`
query($idRoom: ID!)
{room(_id:$idRoom){
    _id
    type
    sex
    images
    peoples
    roomNum
    phone 
    roomName
    description
    acreage
    utilities
    address{
        name{
            city
            wardsAndStreet
            districts
            any
        }
        loc{
            coordinates
        }
    }
    price {
        room{
            free
            price
        }

        electricity{
            free
            price
        }

        water {
            free
            price
        }

        internet  {
            free
            price
        }
    }
    createdAt
    createdBy {
        name
        email
        phone
        avatar
        _id
    }       
}}
`

export const CREATE_ROOM = gql`
mutation (
        $sex: Int, 
        $type: Int, 
        $address: addressInput,  
        $images: [Upload], 
        $roomNum: Int, 
        $peoples: Int,  
        $acreage: Int, 
        $utilities: [Int],
        $price: priceInput,
        $phone: String,
        $roomName: String,
        $description: String
)
{
  createRoom(
      room: {
        sex: $sex, 
        type: $type, 
        address:  $address,
        images: $images,
        roomNum: $roomNum, 
        peoples: $peoples, 
        acreage: $acreage, 
        utilities: $utilities, 
        price:  $price
        phone: $phone
        roomName: $roomName
        description : $description
        }
    ){
        _id
            type
            images
            roomNum
            phone 
            roomName
            description
            address{
                name{
                    city
                    wardsAndStreet
                    districts
                }
                loc{
                    coordinates
                }
            }
            price {
                room{
                    free
                    price
                }
            }
            createdAt
            createdBy {
                name
                phone
                avatar
                _id
            }
    }
}`

export const ROOM_USER_CREATED = gql`
    query {
        user {
            created{
                _id
                type
                images
                roomNum
                phone 
                roomName
                description
                address{
                    name{
                        city
                        wardsAndStreet
                        districts
                    }
                    loc{
                        coordinates
                    }
                }
                price {
                    room{
                        free
                        price
                    }
                }
                createdAt
                createdBy {
                    name
                    phone
                    avatar
                    _id
                }
            }   
        }
    }
`;

export const DELETE_ROOM = gql`
    query($idRoom: ID! ) {
        deleteRoom(_id: $idRoom) {
            _id
        }
    }
`

export const UPDATE_ROOM = gql`
mutation updateRoom (
    $_id: ID!,
    $sex: Int, 
    $type: Int, 
    $address: addressInput,  
    $images: [Upload], 
    $roomNum: Int, 
    $peoples: Int,  
    $acreage: Int, 
    $utilities: [Int],
    $price: priceInput,
    $phone: String,
    $roomName: String,
    $description: String
    $imagesName: [String] 
) {
  updateRoom (  
    _id:$_id, 
    room: {
        sex: $sex, 
        type: $type, 
        address:  $address,
        images: $images,
        roomNum: $roomNum, 
        peoples: $peoples, 
        acreage: $acreage, 
        utilities: $utilities, 
        price:  $price
        phone: $phone
        roomName: $roomName
        description : $description
        },
    imagesName: $imagesName
  )
  {
    _id
    type
    sex
    images
    peoples
    roomNum
    phone 
    roomName
    description
    acreage
    utilities
    address{
        name{
            city
            wardsAndStreet
            districts
            any
        }
        loc{
            coordinates
        }
    }
    price {
        room{
            free
            price
        }

        electricity{
            free
            price
        }

        water {
            free
            price
        }

        internet  {
            free
            price
        }
    }
    createdAt
    createdBy {
        name
        email
        phone
        avatar
        _id
    }       
  }
}
`




