import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      projects,
      stats: {
        totalProjects: projects.length,
        featuredProjects: projects.filter(
          (project) => project.featured
        ).length,
      },
    });
  } catch (error) {
    console.error("GET PROJECTS ERROR:");
    console.dir(error, { depth: null });

    return NextResponse.json(
      {
        projects: [],
        stats: {
          totalProjects: 0,
          featuredProjects: 0,
        },
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

    console.log("PROJECT BODY:");
    console.dir(body, { depth: null });

    const images = Array.isArray(body.imageUrls)
      ? body.imageUrls
      : [];

    const project =
      await prisma.project.create({
        data: {
          title: body.title,
          slug: body.slug,
          description: body.description,

          imageUrls: images,

          liveUrl:
            body.liveUrl || null,

          githubUrl:
            body.githubUrl || null,

          technologies: Array.isArray(
            body.technologies
          )
            ? body.technologies
            : [],

          featured:
            body.featured === true,
        },
      });

    return NextResponse.json(
      project
    );
  } catch (error) {
    console.error(
      "PROJECT CREATE ERROR:"
    );

    console.dir(error, {
      depth: null,
    });

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request
) {
  try {
    const { id } =
      await req.json();

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "PROJECT DELETE ERROR:"
    );

    console.dir(error, {
      depth: null,
    });

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}