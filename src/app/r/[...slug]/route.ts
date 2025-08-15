import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  try {
    const { slug } = await params;

    // Handle the case where slug might be undefined (for index page)
    let filePath: string;
    if (slug && slug.length > 0) {
      // Join the slug parts and remove .json extension if present
      const slugPath = slug.join("/");
      filePath = slugPath.endsWith(".json")
        ? slugPath.slice(0, -5) + ".mdx" // Remove .json and add .mdx
        : slugPath + ".mdx";
    } else {
      filePath = "index.mdx";
    }

    // Construct the full path to the markdown file
    const fullPath = join(process.cwd(), "src", "content", "docs", filePath);

    // Read the markdown file
    const content = await readFile(fullPath, "utf-8");

    // Return the raw markdown content
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return new NextResponse("Markdown file not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
