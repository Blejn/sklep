"use server"

import { addToCart } from '@/api/cart';
import { createReviewForProduct, publishReviewForProduct } from '@/api/products/createReview';
import { getOrCreateCard } from '@/app/cart/actions';
import { type ReviewSchemaDto } from "@/lib/schema/review-schema";

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
