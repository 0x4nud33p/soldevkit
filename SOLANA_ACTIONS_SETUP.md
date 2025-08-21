# Solana Actions & Blinks Setup Guide

This guide explains how to set up and use Solana Actions for crypto donations in your SoldevKit UI project.

## What are Solana Actions & Blinks?

**Solana Actions** are specification-compliant APIs that return transactions on the Solana blockchain to be previewed, signed, and sent across various contexts including QR codes, buttons, widgets, and websites.

**Blinks (Blockchain Links)** turn any Solana Action into a shareable, metadata-rich link that can be displayed and interacted with across different platforms.

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Replace with your actual Solana wallet address
SOLANA_DONATION_WALLET=YourActualWalletAddressHere

# Solana RPC URL (optional)
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Your domain
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# Resend Email Service Configuration
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here
# Email address must be from a verified domain at https://resend.com/domains
FROM_EMAIL=noreply@yourdomain.com
```

### Email Service Setup

The project includes an email subscription feature powered by Resend. To set it up:

1. **Create a Resend account** at [resend.com](https://resend.com)
2. **Get your API key** from [resend.com/api-keys](https://resend.com/api-keys)
3. **Verify your domain** at [resend.com/domains](https://resend.com/domains)
4. **Update environment variables**:
   - Set `RESEND_API_KEY` to your API key
   - Set `FROM_EMAIL` to an email address using your verified domain (e.g., `noreply@yourdomain.com`)

**Important**: Without domain verification, you can only send emails to your own email address. To send to other recipients, domain verification is required.

### 2. Install Required Dependencies

The following Solana dependencies are already included in the project:

```bash
pnpm add @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

### 3. API Endpoints

The following API endpoints are automatically created:

- **GET** `/api/actions/donate` - Returns Action metadata
- **POST** `/api/actions/donate?amount={amount}` - Creates donation transaction
- **OPTIONS** `/api/actions/donate` - CORS preflight

### 4. Actions Configuration

The `public/actions.json` file is automatically configured to register your Actions endpoints:

```json
{
  "rules": [
    {
      "pathPattern": "/api/actions/**",
      "apiPath": "/api/actions/**"
    }
  ]
}
```

## How It Works

### 1. Banner Integration

The donation link in the banner uses the Dialect Blinks format:

```
https://dial.to/?action=solana-action:https://yourdomain.com/api/actions/donate
```

### 2. Donation Flow

1. User clicks the donation banner
2. Dialect opens the Blink interface
3. User selects donation amount (0.1, 0.5, 1, 2, 5 SOL or custom)
4. User connects their Solana wallet
5. Transaction is created and signed
6. SOL is transferred to your donation wallet
7. Success message is displayed

### 3. Supported Amounts

- **Preset amounts**: 0.1, 0.5, 1, 2, 5 SOL
- **Custom amount**: User can enter any amount
- **Minimum**: 0.001 SOL (to cover transaction fees)

## Testing Your Actions

### 1. Local Development

```bash
pnpm run dev
```

Test your Actions locally at:

- `http://localhost:3000/api/actions/donate`

### 2. Blinks Inspector

Use the [Blinks Inspector](https://actions.dialect.to/) to test your Actions:

1. Enter your Action URL: `https://yourdomain.com/api/actions/donate`
2. Test the GET request to see metadata
3. Test the POST request with different amounts

### 3. Production Testing

Once deployed, test your Blink at:

```
https://dial.to/?action=solana-action:https://yourdomain.com/api/actions/donate
```

## Security Considerations

1. **Wallet Address**: Keep your donation wallet address secure
2. **RPC Endpoints**: Use reliable RPC providers for production
3. **CORS Headers**: Properly configured for cross-origin requests
4. **Input Validation**: All amounts are validated before transaction creation
5. **Error Handling**: Comprehensive error handling for failed transactions

## Customization

### 1. Donation Amounts

Modify the preset amounts in `/src/app/api/actions/donate/route.ts`:

```typescript
const actions = [
  { label: "Donate 0.1 SOL", href: `${baseHref}?amount=0.1` },
  { label: "Donate 0.5 SOL", href: `${baseHref}?amount=0.5` },
  // Add more amounts...
];
```

### 2. Branding

Update the Action metadata:

```typescript
const response = {
  title: "Your Project Name",
  description: "Your custom description",
  icon: "https://yourdomain.com/your-logo.svg",
  // ...
};
```

### 3. Success Messages

Customize the completion message:

```typescript
const response = {
  message: `Thank you for your ${donationAmount} SOL donation!`,
  links: {
    next: {
      action: {
        title: "Custom Success Title",
        description: "Custom success message",
      },
    },
  },
};
```

## Deployment

### 1. Environment Variables

Ensure your production environment has:

- `SOLANA_DONATION_WALLET`
- `SOLANA_RPC_URL`
- `NEXT_PUBLIC_DOMAIN`

### 2. Domain Configuration

Update the banner link with your production domain:

```typescript
href =
  "https://dial.to/?action=solana-action:https://yourdomain.com/api/actions/donate";
```

### 3. CORS Configuration

The API routes include proper CORS headers for cross-origin requests.

## Troubleshooting

### Common Issues

1. **Invalid wallet address**: Ensure `SOLANA_DONATION_WALLET` is a valid Solana public key
2. **RPC errors**: Check your `SOLANA_RPC_URL` is accessible
3. **CORS issues**: Verify CORS headers are properly set
4. **Transaction failures**: Check wallet has sufficient SOL for fees

### Debug Mode

Enable debug logging by checking browser console and server logs for detailed error messages.

## Resources

- [Solana Actions Documentation](https://solana.com/developers/guides/advanced/actions)
- [Blinks Inspector](https://actions.dialect.to/)
- [Dialect Documentation](https://docs.dialect.to/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)

## Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the Solana Actions specification
3. Test with the Blinks Inspector
4. Open an issue on the GitHub repository
