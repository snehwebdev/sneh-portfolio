import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedImages: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadResponse =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "portfolio-projects",
          }
        );

      uploadedImages.push(
        uploadResponse.secure_url
      );
    }

    return NextResponse.json({
      images: uploadedImages,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}

