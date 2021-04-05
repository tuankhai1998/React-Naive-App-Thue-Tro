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
        latitude
        longitude
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




