import { gql } from "@apollo/client";

export const FETCH_LOCAL_ADDRESS = gql`
query{
 localAddress {
     name 
     code 
     districts{
         name
     }
 }
}
`
