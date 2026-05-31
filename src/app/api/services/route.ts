import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: {
      title: "asc",
    },
  });
  console.log("SERVICES:", services);
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const body = await req.json();

  const service = await prisma.service.create({
    data: {
      title: body.title,
      description: body.description,
      icon: body.icon,
      featured: body.featured ?? false,
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