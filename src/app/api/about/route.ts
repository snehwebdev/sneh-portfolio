import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const about = await prisma.about.findFirst();

  return NextResponse.json(about);
}

export async function POST(req: Request) {
  const body = await req.json();

  const existing = await prisma.about.findFirst();

  if (existing) {
    const updated = await prisma.about.update({
      where: {
        id: existing.id,
      },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
      },
    });

    return NextResponse.json(updated);
  }

  const created = await prisma.about.create({
    data: {
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
    },
  });

  return NextResponse.json(created);
}