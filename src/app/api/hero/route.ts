import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();

    return NextResponse.json({
      hero,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch hero",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existingHero = await prisma.hero.findFirst();

    if (existingHero) {
      const updated = await prisma.hero.update({
        where: {
          id: existingHero.id,
        },

        data: {
          name: body.name,
          headline: body.headline,
          subheadline: body.subheadline,
          description: body.description,
          profileImage: body.profileImage,
          resumeUrl: body.resumeUrl,
          githubUrl: body.githubUrl,
          linkedinUrl: body.linkedinUrl,
        },
      });

      return NextResponse.json({
        hero: updated,
      });
    }

    const hero = await prisma.hero.create({
      data: {
        name: body.name,
        headline: body.headline,
        subheadline: body.subheadline,
        description: body.description,
        profileImage: body.profileImage,
        resumeUrl: body.resumeUrl,
        githubUrl: body.githubUrl,
        linkedinUrl: body.linkedinUrl,
      },
    });

    return NextResponse.json({
      hero,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to save hero",
      },
      {
        status: 500,
      }
    );
  }
}