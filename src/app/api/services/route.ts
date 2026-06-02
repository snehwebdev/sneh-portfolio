import { prisma } from "@/lib/prisma";
import constants from "constants";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("SERVICES ERROR:", error);
    return NextResponse.json(
      [],
      { status: 500}
    )
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const service = await prisma.service.create({
    data: {
            title: body.title,
            description: body.description,
            icon: body.icon,
            featured: body.featured ?? false,
            order: body.order ?? 0,
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.service.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const service = await prisma.service.update({
    where: {
      id: body.id,
    },
    data: {
      featured: body.featured,
    },
  });

  return NextResponse.json(service);
}