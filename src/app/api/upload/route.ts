import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const files =
      formData.getAll(
        "files"
      ) as File[];

    if (!files.length) {
      return NextResponse.json(
        {
          error:
            "No files uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "projects"
      );

    if (
      !fs.existsSync(
        uploadDir
      )
    ) {
      fs.mkdirSync(
        uploadDir,
        {
          recursive: true,
        }
      );
    }

    const uploaded =
      [];

    for (const file of files) {
      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(
          bytes
        );

      const fileName =
        `${Date.now()}-${file.name.replace(
          /\s+/g,
          "-"
        )}`;

      const filePath =
        path.join(
          uploadDir,
          fileName
        );

      fs.writeFileSync(
        filePath,
        buffer
      );

      uploaded.push(
        `/projects/${fileName}`
      );
    }

    return NextResponse.json({
      images:
        uploaded,
    });
  } catch (
    error
  ) {
    console.log(
      error
    );

    return NextResponse.json(
      {
        error:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}