"use client";
import { useOptimistic, useTransition } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createReviewForProductAction } from "./actions";
import { ReviewSchema, type ReviewSchemaDto } from "@/lib/schema/review-schema";
import { Input } from "@/components/ui/input";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AddReviewSection = ({
	reviews,
	productId,
}: {
	reviews: ReviewSchemaDto[];
	productId: string;
}) => {
	const [isPending, startTransition] = useTransition();

	const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(currentReviews, newReview: ReviewSchemaDto) => [{ ...newReview, id: 0 }, ...currentReviews],
	);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm<ReviewSchemaDto>({
		mode: "onBlur",
		resolver: zodResolver(ReviewSchema),
	});

	const onSubmit: SubmitHandler<ReviewSchemaDto> = async (data: ReviewSchemaDto) => {
		startTransition(() => {
			setOptimisticReviews(data);
		});
		await createReviewForProductAction(data, productId);
		reset();
	};

	return (
		<div>
			<form
				data-testid="add-review-form"
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center justify-between  gap-3"
			>
				<h2>Create review</h2>
				<Input {...register("name")} type="text" placeholder="Name" />
				{errors.name && <p className="mt-2 text-xs italic text-red-500"> {errors.name?.message}</p>}
				<Input {...register("email")} type="email" placeholder="Email" />
				{errors.email && (
					<p className="mt-2 text-xs italic text-red-500"> {errors.email?.message}</p>
				)}
				<Input {...register("headline")} type="text" placeholder="Headline" />
				{errors.headline && (
					<p className="mt-2 text-xs italic text-red-500"> {errors.headline?.message}</p>
				)}
				<Input {...register("content")} type="text" placeholder="Content" />
				{errors.content && (
					<p className="mt-2 text-xs italic text-red-500"> {errors.content?.message}</p>
				)}
				<Input
					{...register("rating", {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						setValueAs: (value) => (value === "" ? undefined : parseFloat(value)),
					})}
					onChange={(e) => {
						const num = parseFloat(e.target.value);
						setValue("rating", num);
					}}
					type="number"
					placeholder="rating"
				/>
				{errors.rating && (
					<p className="mt-2 text-xs italic text-red-500"> {errors.rating?.message}</p>
				)}
				<Button disabled={isPending} type="submit">
					add
				</Button>
			</form>
			{optimisticReviews ? (
				optimisticReviews.map((review, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle>{review.name}</CardTitle>
							<CardDescription>{review.headline}</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{review.content}</p>
						</CardContent>
						<CardFooter>
							<p>{review.email}</p>
						</CardFooter>
						<CardFooter>
							<p>{review.rating}</p>
						</CardFooter>
					</Card>
				))
			) : (
				<></>
			)}
		</div>
	);
};
