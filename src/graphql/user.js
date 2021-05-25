import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query {
        user {
            email
            _id
            name
            avatar
            phone
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
            _id
            token
            avatar
            name
            phone 
            email
            created{
            _id
            }
            liked{
            _id
            }
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

export const UPDATE_USER = gql`
    mutation UPDATE_USER($avatar: Upload, $name: String, $phone: String) {
        updateUser(profile: {
            avatar: $avatar,
            phone: $phone,
            name:$name
        }) {
            avatar
            name
            phone
        }
    }
`


export const USER_INFO = gql`
    query {
        user {
            name
            avatar
            phone
        }
    }
`

export const UPLOAD_FILE = gql`
   mutation UPLOAD_IMAGE($file: Upload!) {
            singleImageUpload(file: $file) {
                url
        }
    }
`