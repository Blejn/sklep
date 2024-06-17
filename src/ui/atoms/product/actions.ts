"use server"

import { createReviewForProduct, publishReviewForProduct } from '@/api/products/createReview';
import { type ReviewSchemaDto } from "@/lib/schema/review-schema";
import { addToCart, getOrCreateCard } from '@/server/cart';

export async function createReviewForProductAction (review: ReviewSchemaDto,productId:string) {

    const reviewData = await createReviewForProduct(review,productId);
    if(reviewData){
        await publishReviewForProduct(reviewData.id);

    }

}

export async function addToCardAction(productId:string) {

    const cart = await getOrCreateCard();

    cart && productId && (await addToCart(cart.id, productId));
}
