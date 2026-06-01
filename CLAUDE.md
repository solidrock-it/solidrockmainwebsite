# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # Install dependencies (runs nuxt prepare postinstall)
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm generate       # Generate static site
pnpm preview        # Preview production build
pnpm test           # Run tests with Vitest
pnpm test:run       # Run tests once without watch mode
pnpm test:ui        # Run tests with UI
```

## Architecture

**Framework:** Nuxt 4 (SSR enabled) with Vue 3 Composition API
**Package Manager:** pnpm
**Styling:** TailwindCSS with custom brand colors (granite-gray, trust-blue, aquamarine, limestone)
**UI Components:** @heroicons/vue, @fortawesome/fontawesome-free, @nuxt/icon

### Directory Structure

```
app/                  # Nuxt 4 app directory (replaces traditional pages/, components/)
  app.vue            # Root component with color mode, page transitions, animations
  pages/             # Route definitions (index.vue, about.vue, services.vue, contact.vue)
  components/        # Reusable components (Hero.vue, ServiceCard.vue, etc.)
  layouts/           # Layout templates (default.vue with header/footer)
server/
  api/               # API endpoints (contact.post.ts - form submission with file upload)
  utils/             # Server utilities (email.ts, smtp-config.ts, antispam.ts)
public/              # Static assets (images, favicons)
```

### Key Modules (nuxt.config.ts)

- `@nuxtjs/tailwindcss` - CSS framework
- `@nuxtjs/color-mode` - Light/dark theme toggle
- `@nuxt/image` - Image optimization
- `@nuxtjs/sitemap` & `@nuxtjs/robots` - SEO
- `nuxt-schema-org` - Structured data for SEO
- `@nuxtjs/google-fonts` - Inter font family

### Server API

**Contact Form (`/api/contact` POST):**
- Accepts multipart/form-data (file uploads up to 10MB) or JSON
- reCAPTCHA v3 verification (skip with dummy-token-for-development/testing)
- Rate limiting via rate-limiter-flexible (configurable via ANTISPAM_* env vars)
- Multi-provider SMTP (gmail, mailtrap, mailgun, sendgrid, zoho, ses)
- Email includes HTML + text versions with attachments

### Environment Variables

```bash
# Site
SITE_URL=https://www.solid-rock.co.za

# Search Console Verification (SEO)
GOOGLE_SITE_VERIFICATION=OqKg2zKk9DusesKooARviY_VsjU0vsm_a4FSHNMpGc0
BING_SITE_VERIFICATION=your_bing_code
PINTEREST_SITE_VERIFICATION=your_pinterest_code

# SMTP Configuration
DEFAULT_SMTP_PROVIDER=gmail
SMTP_GMAIL_HOST=smtp.gmail.com
SMTP_GMAIL_PORT=587
SMTP_GMAIL_SECURE=false
SMTP_GMAIL_USER=your-email@gmail.com
SMTP_GMAIL_PASS=your-app-password
SMTP_GMAIL_FROM_NAME=Your Name

# Email defaults
DEFAULT_EMAIL_FROM=noreply@solid-rock.co.za
DEFAULT_EMAIL_TO=info@solid-rock.co.za
CONTACT_EMAIL=info@solid-rock.co.za

# reCAPTCHA
RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

### SEO Files

- `/public/google98dce45f642fbfe2.html` - Google Search Console verification
- `/public/bing_verification.html` - Bing Webmaster Tools verification (update code before use)
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - Auto-generated robots file

### Anti-Spam Measures (server/utils/antispam.ts)

- Rate limiting per IP/identifier (default: 10 emails/hour)
- Content validation (spam keywords, excessive links, capitalization ratio)
- Recipient limits (max 10 recipients)
- Configurable via `ANTISPAM_EMAIL_LIMIT`, `ANTISPAM_EMAIL_DURATION`, `ANTISPAM_MAX_LINKS`, `ANTISPAM_MAX_RECIPIENTS`

### Pages

- `/` (index.vue) - Hero with animated words, Compensation & Benefits focus, CTA
- `/about` - Company story, Amanda Mokoena (Founder & Director), Compensation & Benefits portfolio
- `/services` - Compensation & Benefits Solutions service listings (Retirement Funds, Beneficiary Tracing, Remuneration, Employee Benefits)
- `/contact` - Contact form with file upload, reCAPTCHA

### Tailwind Brand Colors

- `granite-gray` - Primary neutral palette
- `trust-blue` - Primary accent (gradient with aquamarine)
- `aquamarine` - Secondary accent
- `limestone` - Light neutrals
- Dark mode via `class` strategy

### Logos

- `/images/dark_text_logo.png` - Light mode logo (dark text for light backgrounds)
- `/images/light_text_logo.png` - Dark mode logo (light text for dark backgrounds)
