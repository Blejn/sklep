import { z } from "zod";
export const ReviewSchema = z.object({
    name:z.string({
        required_error:"Name is required"
    }),
    email:z.string({
        required_error:"Email is required"
    }
    ).email(),
    content:z.string({
        required_error:"Content is required"
    })
    .min(5,{message:"Content is too short"}),
    headline:z.string({required_error:"Name is required"
    })
    .min(2),
    rating: z.number()
    .min(1).max(5).optional().nullable()
})

export type ReviewSchemaDto = z.infer< typeof ReviewSchema>