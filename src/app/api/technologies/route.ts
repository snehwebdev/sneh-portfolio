import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const technologies =
      await prisma.technology.findMany({
        orderBy: [
          {
            category: "asc",
          },
          {
            name: "asc",
          },
        ],
      });

    return NextResponse.json(
      technologies
    );
  } catch (error) {
    console.error(
      "TECHNOLOGIES ERROR:",
      error
    );

    return NextResponse.json(
      [],
      {
        status: 500,
      }
    );
  }
}



export async function POST(
  req: Request
) {
  const body = await req.json();

  const technology =
    await prisma.technology.create({
      data: {
        category:
          body.category,
        name: body.name,
        logoUrl:
          body.logoUrl,
      },
    });

  return NextResponse.json(
    technology
  );
}

export async function DELETE(
  req: Request
) {
  const { id } =
    await req.json();

  await prisma.technology.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}