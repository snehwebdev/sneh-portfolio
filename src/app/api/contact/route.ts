import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const contact = await prisma.contact.findFirst();

  return NextResponse.json(contact);
}

export async function POST(req: Request) {
  const body = await req.json();

  const existingContact =
    await prisma.contact.findFirst();

  let contact;

  if (existingContact) {
    contact = await prisma.contact.update({
      where: {
        id: existingContact.id,
      },
      data: {
        email: body.email,
        phone: body.phone,
        linkedin: body.linkedin,
        github: body.github,
        location: body.location,
      },
    });
  } else {
    contact = await prisma.contact.create({
      data: {
        email: body.email,
        phone: body.phone,
        linkedin: body.linkedin,
        github: body.github,
        location: body.location,
      },
    });
  }

  return NextResponse.json(contact);
}