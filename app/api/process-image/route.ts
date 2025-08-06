import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    const webhookUrl =
      "https://hook.eu2.make.com/l2jfa1t6bncxc7ip7gxh5d58ao4wksiv";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error("Webhook failed");
    }

    const data = await response.json();
    const processedImageUrl = data.results[0].result;

    return NextResponse.json({
      success: true,
      processedImageUrl,
    });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
