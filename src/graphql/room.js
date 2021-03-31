import { gql } from "@apollo/client";

export const FETCH_ROOM = gql`
    query( $page: Int, $per_page: Int){
        rooms(page: $page, per_page: $per_page) {
            _id
            images
            roomNum
            type
            address{
                name
            }
            price {
                room{
                    price
                }
            }
        }
    }

`;


