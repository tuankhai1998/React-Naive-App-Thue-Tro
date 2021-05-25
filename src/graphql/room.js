import { gql } from "@apollo/client";

export const FETCH_ROOM = gql`
    query ($page: Int, $per_page:Int, $query: roomSearch, $sortBy:[sortBy]){
        rooms (page: $page, per_page: $per_page, sortBy :$sortBy, query : $query ){
            _id
            type
            images
            roomNum
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
    images
    roomNum
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
        $price: priceInput
){
  createRoom(room: {
        sex: $sex, 
        type: $type, 
        address:  $address,
        images: $images,
        roomNum: $roomNum, 
        peoples: $peoples, 
        acreage: $acreage, 
        utilities: $utilities, 
        price:  $price}){
            _id
            type
            images
            roomNum
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

    

`



