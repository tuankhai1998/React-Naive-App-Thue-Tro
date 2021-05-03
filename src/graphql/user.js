import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query {
        user {
            email
            _id
            liked{
                _id
            }
            created{
                _id
            }   
        }
    }
`;

export const GET_LIST_ROOM_LIKED = gql`
query {
        user {
            liked{
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
          
    }
`


export const LOGIN = gql`
   query($email: String!, $password: String!){
        login(email: $email password: $password){
            token 
            _id
            refreshToken
            expiresIn
        }
    }
`;


export const CREATE_USER = gql`
    mutation($email: String!, $password: String!){
        createUser(email: $email password: $password){
            token 
            _id
            refreshToken
            expiresIn
        }
    }
`;


export const TOGGLE_LIKE_ROOM = gql`
    mutation($idRoom:  ID!) {
        likedRoom(_idRoom: $idRoom) {
       
                    email
                    _id
                    liked{
                        _id
                    }
                    created{
                        _id
                    }   
        
            }
  }
`