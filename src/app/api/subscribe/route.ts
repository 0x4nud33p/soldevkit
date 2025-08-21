import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { WelcomeEmailTemplate } from "@/components/email/email-template";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = subscribeSchema.parse(body);
    const { email } = validatedData;

    // Check if required environment variables are set
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 },
      );
    }

    if (!process.env.FROM_EMAIL) {
      console.error("FROM_EMAIL is not set");
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 },
      );
    }

    // Initialize Resend after environment variable checks
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "noreply@soldevkit.com",
      to: [email],
      subject: "Welcome to SolDevKit!",
      react: WelcomeEmailTemplate(),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: 500 },
      );
    }

    console.log(
      "Welcome email sent successfully to:",
      email,
      "Email ID:",
      data?.id,
    );

    // Optional: Add to mailing list (if you have one)
    // You can integrate with Resend's audience management here
    // or save to your database

    return NextResponse.json(
      {
        message: "Successfully subscribed! Check your email for confirmation.",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    // Handle Resend errors
    if (error && typeof error === "object" && "message" in error) {
      console.error("Resend error:", error.message);

      return NextResponse.json(
        { error: "Failed to send confirmation email" },
        { status: 500 },
      );
    }

    // Generic error
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

// Optional: Handle GET requests to check API status
export async function GET() {
  return NextResponse.json(
    {
      message: "Email subscription API is running",
      timestamp: new Date().toISOString(),
    },
    { status: 200 },
  );
}
