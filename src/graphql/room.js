import { gql } from "@apollo/client";

export const FETCH_ROOM = gql`
    query( $page: Int, $per_page: Int, $query: roomSearch, $sortBy: [sortBy]){
        rooms(page: $page, per_page: $per_page, query: $query, sortBy: $sortBy) {
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




