import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Przetwarzanie danych webhooka
    const payload = await request.json();

    // Debugging: Możesz zalogować payload, aby zobaczyć jego strukturę
    console.log("Received payload:", payload);

    // Tutaj możesz dodać logikę do odświeżania ścieżek lub danych
    // Przykładowo, jeśli chcesz odświeżyć stronę produktu:
    await revalidatePath(`/products/${payload.data.id}`);

    // Możesz dodać więcej logiki odświeżania w zależności od struktury payload i potrzeb

    return NextResponse.json({ message: "Webhook received and revalidated" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 });
  }
}
