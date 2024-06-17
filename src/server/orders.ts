"use server"

import { executeGraphql } from "./graphqlApi"

import { GetOrdersByEmailDocument, type GetOrdersByEmailQuery } from "@/gql/graphql"


export  async function getOrdersByEmail(email:string) : Promise<GetOrdersByEmailQuery['ordersConnection']>{
    const graphqlResponse = await  executeGraphql({
        query: GetOrdersByEmailDocument,
        variables:{
            email:email
        },
        next:{tags:['orders']},
        cache:"force-cache"
    })
    if(!graphqlResponse.ordersConnection){
        throw new Error("No response from orders")
    }
    return graphqlResponse.ordersConnection
}