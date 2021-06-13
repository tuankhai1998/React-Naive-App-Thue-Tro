import { gql } from "@apollo/client";


export const NEW_MESSAGES = gql`
    subscription newMessage{
        newMessage {
            chatRoom
            messageBody
            from{
            name
            email
            }
            createdAt
            messageStatus
        }
}
`

export const SEND_MESSAGE = gql`
mutation sendMessage(
    $chatRoom: ID!,
    $messageBody: String!,
    $to: ID!
){
  sendMessage(data: {
    chatRoom: $chatRoom 
    messageBody: $messageBody
    to : $to
  }) {
    chatRoom
    messageBody
    createdAt
    from {
      email
      name
    }
    to {
      email
      name
    }
  }
}
`

export const CREATE_CHAT_ROOM = gql`
mutation createChatRoom ($user_id: ID!) {
  createRoomChat (userID: $user_id) {
    _id,
    members {
      _id
    }
    messages{
      from {
        _id
      }
      to {
        _id
      }
      chatRoom
    }
  }
}
`

export const GET_ALL_CHAT_ROOM = gql`
query {
  getAllChatRooms {
    _id
    members {
      _id
      email
      avatar
      name
    }
  }
}
`

export const GET_ALL_MESSAGE_ROOM = gql`
query getAllMessageOfChatRoom($roomID: ID!){
  getAllMessageOfChatRoom(_id: $roomID) {
    messageBody
    messageStatus
    from{
      _id
      name
    }
    to{
      _id
      name
    }
    createdAt
  }
}
`