import { gql } from "@apollo/client";

export const CURET_USER = gql`
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


export const LIKE_ROOM = gql`
    mutation($idRoom : ID!){
        likedRoom(_idRoom : $idRoom){
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
    }
`;