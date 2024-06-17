import { revalidateTag } from "next/cache";

import { executeGraphql } from "../graphqlApi";

import { CreateReviewForProductDocument, PublishReviewForProductDocument, type CreateReviewForProductMutation, type PublishReviewForProductMutation } from "@/gql/graphql";
import { environment } from "@/lib/environment";
import { type ReviewSchemaDto } from "@/lib/schema/review-schema";

const {HYGRAPH_MUTATION_TOKEN}  = environment
export const createReviewForProduct = async(review:ReviewSchemaDto, productId:string):Promise<CreateReviewForProductMutation['createReview']>=>{
      
        const graphqlResponse = await executeGraphql({
            query:CreateReviewForProductDocument,
            variables:{
                ...review,
                productId:productId
            },
            headers:{
                'Authorization':`Bearer ${HYGRAPH_MUTATION_TOKEN}`
            }
        });

        revalidateTag('product')
        

        return graphqlResponse.createReview;
    
    }
    export const publishReviewForProduct = async(reviewId:string) : Promise<PublishReviewForProductMutation["publishReview"]>=>{
        const graphqlResponse = await executeGraphql({
            query:PublishReviewForProductDocument,
            variables:{
                reviewId:reviewId
            },
            headers:{
                'Authorization':`Bearer ${HYGRAPH_MUTATION_TOKEN}`
            }
        })
        revalidateTag("product");
        return graphqlResponse.publishReview;
    }
