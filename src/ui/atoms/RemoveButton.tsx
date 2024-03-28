"use client"
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

import { removeProductFromCart } from '@/app/cart/actions'


export const RemoveButton = ({orderItemId}:{orderItemId:string}) => {

 const [isPending, startTransition]= useTransition();
 const router = useRouter();



   return (
    <button disabled={isPending} className='text-red-500' onClick={ ()=>{
    startTransition(async ()=>{
        await removeProductFromCart(orderItemId);
        router.refresh()

    })}}>Remove</button>
  )
}

