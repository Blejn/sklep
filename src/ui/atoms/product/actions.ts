"use server"

import { createReviewForProduct, publishReviewForProduct } from '@/api/products/createReview';
import { type ReviewSchemaDto } from "@/lib/schema/review-schema";

export async function createReviewForProductAction (review: ReviewSchemaDto,productId:string) {

    const reviewData = await createReviewForProduct(review,productId);
    if(reviewData){
        await publishReviewForProduct(reviewData.id);

    }

}
