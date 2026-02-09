# Solid Rock Business Solutions Website

Professional website for Solid Rock Business Solutions, delivering integrated Finance and HR solutions.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Environment Configuration

Create a `.env` file in the root directory based on the `.env.example` file:

```bash
cp .env.example .env
```

Then update the values in `.env` with your actual configuration:

- **reCAPTCHA**: Sign up at [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create) to get your site and secret keys
- **SMTP**: Configure your email provider settings (Gmail, Mailgun, SendGrid, etc.)

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
