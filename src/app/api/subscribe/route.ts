import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = subscribeSchema.parse(body);
    const { email } = validatedData;

    // Check if required environment variables are set
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.FROM_EMAIL) {
      console.error('FROM_EMAIL is not set');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Prepare welcome email
    const msg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'SolDevKit Team',
      },
      subject: 'Welcome to SolDevKit Updates!',
      text: `Hi there,\n\nThank you for subscribing to SolDevKit updates! You'll be the first to know about new features, tools, and resources for Solana development.\n\nStay tuned for exciting updates!\n\nBest regards,\nThe SolDevKit Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome to SolDevKit Updates!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Hi there,
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Thank you for subscribing to SolDevKit updates! You'll be the first to know about:
          </p>
          
          <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            <li>New development tools and components</li>
            <li>Solana ecosystem updates</li>
            <li>Best practices and tutorials</li>
            <li>Community highlights</li>
          </ul>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Stay tuned for exciting updates!
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #999; font-size: 14px; margin: 0;">
              Best regards,<br>
              The SolDevKit Team
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);

    // Optional: Add to mailing list (if you have one)
    // You can integrate with SendGrid's Marketing Campaigns API here
    // or save to your database

    return NextResponse.json(
      { 
        message: 'Successfully subscribed! Check your email for confirmation.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    // Handle SendGrid errors
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as { response?: { body?: { errors?: Array<{ message?: string }> } } };
      console.error('SendGrid error:', sgError.response?.body);
      
      // Check for specific SendGrid errors
      const errorBody = sgError.response?.body;
      if (errorBody && 'errors' in errorBody && Array.isArray(errorBody.errors)) {
        const firstError = errorBody.errors[0];
        if (firstError?.message?.includes('Maximum credits exceeded')) {
          return NextResponse.json(
            { error: 'Email service temporarily unavailable. Please try again later or contact support.' },
            { status: 503 }
          );
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests to check API status
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Email subscription API is running',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}