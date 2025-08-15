# SendGrid Email Service Setup

This guide explains how to set up and use the SendGrid email service for user subscriptions in your SolDevKit application.

## Prerequisites

- A SendGrid account (free tier available)
- A verified sender email address
- Basic understanding of environment variables

## Setup Instructions

### 1. Create a SendGrid Account

1. Go to [SendGrid](https://sendgrid.com) and create a free account
2. Verify your email address
3. Complete the account setup process

### 2. Create an API Key

1. Navigate to **Settings** > **API Keys** in your SendGrid dashboard
2. Click **Create API Key**
3. Choose **Restricted Access** for security
4. Grant the following permissions:
   - **Mail Send**: Full Access
   - **Marketing**: Read Access (optional, for future mailing list features)
5. Copy the generated API key (you won't see it again!)

### 3. Verify Sender Identity

1. Go to **Settings** > **Sender Authentication**
2. Choose one of these options:
   - **Single Sender Verification**: Verify a single email address (easiest for development)
   - **Domain Authentication**: Verify your entire domain (recommended for production)

#### For Single Sender Verification:
1. Click **Verify a Single Sender**
2. Fill in your details:
   - **From Name**: Your name or company name (e.g., "SolDevKit Team")
   - **From Email**: The email you want to send from (e.g., "noreply@yourdomain.com")
   - **Reply To**: Where replies should go
   - **Company Address**: Your business address
3. Check your email and click the verification link

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your SendGrid configuration to `.env.local`:
   ```env
   # SendGrid Email Configuration
   SENDGRID_API_KEY=your_actual_api_key_here
   FROM_EMAIL=your_verified_email@yourdomain.com
   ```

   **Important**: 
   - Replace `your_actual_api_key_here` with your actual SendGrid API key
   - Replace `your_verified_email@yourdomain.com` with your verified sender email
   - Never commit your `.env.local` file to version control

### 5. Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to your homepage
3. Scroll to the footer subscription form
4. Enter a test email address and submit
5. Check that:
   - The form shows a success message
   - The test email receives a welcome message
   - No errors appear in the browser console or terminal

## API Endpoints

### POST /api/subscribe

Subscribes a user to email updates.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```

**Success Response (200):**
```json
{
  "message": "Successfully subscribed! Check your email for confirmation.",
  "success": true
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "details": [ // only for validation errors
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### GET /api/subscribe

Health check endpoint.

**Response (200):**
```json
{
  "message": "Email subscription API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Frontend Integration

The subscription form is integrated into the homepage footer using:

- **Hook**: `useEmailSubscription()` - Handles API calls and state management
- **Form**: Controlled inputs with validation and loading states
- **Feedback**: Success/error messages with auto-dismiss

### Using the Hook

```tsx
import { useEmailSubscription } from '@/components/hooks/use-email-subscription';

function MyComponent() {
  const { subscribe, isLoading, error, success, reset } = useEmailSubscription();

  const handleSubmit = async (email: string, name?: string) => {
    try {
      await subscribe({ email, name });
      // Handle success
    } catch (err) {
      // Error is automatically handled by the hook
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Subscribed successfully!</p>}
      {/* Your form here */}
    </div>
  );
}
```

## Email Template Customization

The welcome email template is defined in `/src/app/api/subscribe/route.ts`. You can customize:

- **Subject line**: Change the `subject` field
- **Text content**: Modify the `text` field for plain text emails
- **HTML content**: Update the `html` field for rich formatting
- **Sender name**: Adjust the `from.name` field

## Production Considerations

### Security
- Use environment variables for all sensitive data
- Never expose API keys in client-side code
- Consider rate limiting for the subscription endpoint
- Validate and sanitize all user inputs

### Deliverability
- Set up domain authentication for better deliverability
- Monitor your sender reputation
- Implement double opt-in for compliance
- Add unsubscribe links to all emails

### Monitoring
- Monitor SendGrid dashboard for delivery statistics
- Set up alerts for failed sends
- Log subscription events for analytics
- Track email engagement metrics

### Scaling
- Consider using SendGrid's Marketing Campaigns for large lists
- Implement database storage for subscriber management
- Add segmentation and personalization features
- Set up automated email sequences

## Troubleshooting

### Common Issues

1. **"Email service configuration error"**
   - Check that `SENDGRID_API_KEY` and `FROM_EMAIL` are set in `.env.local`
   - Verify the API key has correct permissions

2. **"Maximum credits exceeded" (401 Unauthorized)**
   - **Cause**: Your SendGrid account has reached its monthly sending limit
   - **Free Account Limit**: 100 emails/day for the first 30 days, then requires verification
   - **Solutions**:
     - Wait until next month for credits to reset
     - Upgrade to a paid SendGrid plan
     - Verify your account with SendGrid for higher limits
     - Use a different email service provider temporarily
   - **Check Usage**: Go to SendGrid Dashboard → Settings → Account Details → Usage

3. **"Failed to send confirmation email"**
   - Ensure your sender email is verified in SendGrid
   - Check SendGrid dashboard for delivery errors
   - Verify API key permissions

4. **"Invalid email address"**
   - The email format validation failed
   - Check the email input for typos

5. **Emails not being received**
   - Check spam/junk folders
   - Verify sender authentication is complete
   - Check SendGrid activity dashboard

### Debug Mode

To enable detailed logging, check the browser console and terminal output when testing the subscription form. The API route logs detailed error information for debugging.

## Support

For SendGrid-specific issues:
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Support](https://support.sendgrid.com/)

For integration issues:
- Check the browser console for client-side errors
- Check the terminal output for server-side errors
- Verify all environment variables are correctly set