# SEO Setup Guide - Solid Rock Strategic Business Solutions

This guide explains how to verify your website with search engines and set up SEO for optimal visibility.

## Search Console Verification

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Add a new property: `https://www.solid-rock.co.za`
4. Choose **HTML file** verification method
5. Download the verification HTML file
6. Place it in the `public/` folder (it will be served at the root)
7. Click **Verify**

**Alternative:** Use the HTML tag method - the meta tag is already configured in `nuxt.config.ts`:
```html
<meta name="google-site-verification" content="your_google_code">
```

To update the verification code, set the environment variable:
```bash
GOOGLE_SITE_VERIFICATION=your_new_verification_code
```

### Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with your Microsoft account
3. Add a new site: `https://www.solid-rock.co.za`
4. Choose **Meta tag** verification method
5. Copy the verification code
6. Update your `.env` file:
   ```bash
   BING_SITE_VERIFICATION=your_bing_verification_code
   ```
7. Click **Verify**

**Alternative:** Use the HTML file method - place `bing_verification.html` in `public/` after updating the code.

### Pinterest

1. Go to [Pinterest Business](https://business.pinterest.com/)
2. Claim your website
3. Copy the verification code
4. Update your `.env` file:
   ```bash
   PINTEREST_SITE_VERIFICATION=your_pinterest_verification_code
   ```

## Sitemap

The sitemap is automatically generated at `/sitemap.xml` by the `@nuxtjs/sitemap` module.

**For Netlify deployment:**
- The sitemap is pre-rendered during `pnpm generate`
- Accessible at `https://www.solid-rock.co.za/sitemap.xml`

Submit your sitemap to:
- **Google:** Search Console → Sitemaps → Add `sitemap.xml`
- **Bing:** Webmaster Tools → Sitemaps → Submit `sitemap.xml`

## Robots.txt

The `@nuxtjs/robots` module manages robots.txt. Current configuration allows all bots to crawl the site.

**For Netlify deployment:**
- The robots.txt is generated during build
- Includes sitemap reference pointing to your `SITE_URL`

To modify, update `nuxt.config.ts`:
```typescript
robots: {
  rules: [
    {
      userAgent: '*',
      allow: '/',
    }
  ],
  sitemap: process.env.SITE_URL ? `${process.env.SITE_URL}/sitemap.xml` : undefined
}
```

## Netlify Deployment

### Configuration Files

**`netlify.toml`** is configured with:
- Build command: `pnpm generate`
- Publish directory: `dist`
- Proper headers for robots.txt and sitemap.xml (correct content types)
- Cache headers for static assets
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)

### Deploy Steps

1. **Connect to Netlify:**
   - Push code to GitHub/GitLab/Bitbucket
   - Connect repository in Netlify dashboard

2. **Build Settings:**
   - Build command: `pnpm generate`
   - Publish directory: `dist`
   - Node version: 20

3. **Environment Variables (in Netlify dashboard):**
   ```
   SITE_URL=https://www.solid-rock.co.za
   GOOGLE_SITE_VERIFICATION=your_google_code
   BING_SITE_VERIFICATION=your_bing_code
   ```

4. **After Deploy:**
   - Verify `/robots.txt` loads correctly
   - Verify `/sitemap.xml` loads and lists all pages
   - Submit sitemap to search consoles

## Structured Data (Schema.org)

The site includes Organization schema markup for better search visibility. Data is configured in `nuxt.config.ts` under `schemaOrg.identity`.

Includes:
- Organization name and alternate name
- Logo
- Address (Centurion, South Africa)
- Contact information
- Social media links (add to `sameAs` array)

## Local SEO

The following geo meta tags are configured:
- `geo.region`: ZA-GP (Gauteng Province)
- `geo.placename`: Centurion

## Open Graph (Social Media)

The site includes Open Graph tags for Facebook and LinkedIn:
- `og:type`: website
- `og:site_name`: Solid Rock Strategic Business Solutions
- `og:locale`: en_ZA
- `og:country-name`: South Africa

## Twitter Cards

Twitter card meta tags are configured:
- `twitter:card`: summary_large_image
- `twitter:site`: @solidrock

## Checklist for Production

- [ ] Verify Google Search Console
- [ ] Verify Bing Webmaster Tools
- [ ] Submit sitemap to both consoles
- [ ] Set up Google Analytics (optional)
- [ ] Add social media URLs to schema.org `sameAs` array
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test with [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Set up SSL certificate (HTTPS)
- [ ] Ensure SITE_URL in .env matches your production domain

## Environment Variables

Add these to your `.env` file for production:

```bash
# Site URL (no trailing slash)
SITE_URL=https://www.solid-rock.co.za

# Search Console Verification
GOOGLE_SITE_VERIFICATION=your_google_code
BING_SITE_VERIFICATION=your_bing_code
PINTEREST_SITE_VERIFICATION=your_pinterest_code
```
