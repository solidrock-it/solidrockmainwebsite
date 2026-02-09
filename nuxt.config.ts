// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineOrganization } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/fontaine',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
  ],
  runtimeConfig: {
    // New SMTP configuration
    defaultSmtpProvider: process.env.DEFAULT_SMTP_PROVIDER,
    smtpGmailHost: process.env.SMTP_GMAIL_HOST,
    smtpGmailPort: process.env.SMTP_GMAIL_PORT,
    smtpGmailSecure: process.env.SMTP_GMAIL_SECURE,
    smtpGmailUser: process.env.SMTP_GMAIL_USER,
    smtpGmailPass: process.env.SMTP_GMAIL_PASS,
    smtpGmailFromName: process.env.SMTP_GMAIL_FROM_NAME,
    smtpMailtrapHost: process.env.SMTP_MAILTRAP_HOST,
    smtpMailtrapPort: process.env.SMTP_MAILTRAP_PORT,
    smtpMailtrapSecure: process.env.SMTP_MAILTRAP_SECURE,
    smtpMailtrapUser: process.env.SMTP_MAILTRAP_USER,
    smtpMailtrapPass: process.env.SMTP_MAILTRAP_PASS,
    smtpMailtrapFromName: process.env.SMTP_MAILTRAP_FROM_NAME,
    smtpMailgunHost: process.env.SMTP_MAILGUN_HOST,
    smtpMailgunPort: process.env.SMTP_MAILGUN_PORT,
    smtpMailgunSecure: process.env.SMTP_MAILGUN_SECURE,
    smtpMailgunUser: process.env.SMTP_MAILGUN_USER,
    smtpMailgunPass: process.env.SMTP_MAILGUN_PASS,
    smtpMailgunFromName: process.env.SMTP_MAILGUN_FROM_NAME,
    smtpSendgridHost: process.env.SMTP_SENDGRID_HOST,
    smtpSendgridPort: process.env.SMTP_SENDGRID_PORT,
    smtpSendgridSecure: process.env.SMTP_SENDGRID_SECURE,
    smtpSendgridUser: process.env.SMTP_SENDGRID_USER,
    smtpSendgridPass: process.env.SMTP_SENDGRID_PASS,
    smtpSendgridFromName: process.env.SMTP_SENDGRID_FROM_NAME,
    smtpZohoHost: process.env.SMTP_ZOHO_HOST,
    smtpZohoPort: process.env.SMTP_ZOHO_PORT,
    smtpZohoSecure: process.env.SMTP_ZOHO_SECURE,
    smtpZohoUser: process.env.SMTP_ZOHO_USER,
    smtpZohoPass: process.env.SMTP_ZOHO_PASS,
    smtpZohoFromName: process.env.SMTP_ZOHO_FROM_NAME,
    smtpSesHost: process.env.SMTP_SES_HOST,
    smtpSesPort: process.env.SMTP_SES_PORT,
    smtpSesSecure: process.env.SMTP_SES_SECURE,
    smtpSesUser: process.env.SMTP_SES_USER,
    smtpSesPass: process.env.SMTP_SES_PASS,
    smtpSesFromName: process.env.SMTP_SES_FROM_NAME,
    defaultEmailFrom: process.env.DEFAULT_EMAIL_FROM,

    // Other configuration
    contactEmail: process.env.CONTACT_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      siteUrl: process.env.SITE_URL || 'https://solid-rock.co.za',
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
  build: {
    transpile: [
      '@heroicons/vue',
    ],
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800],
    },
    display: 'swap',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Solid Rock Business Solutions delivers integrated Finance and HR solutions that are practical, tailored, and directly aligned to strategy execution—driving measurable, sustainable results.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Solid Rock Business Solutions' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@solidrock' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      script: [
        {
          src: process.env.RECAPTCHA_SITE_KEY ? `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}` : 'https://www.google.com/recaptcha/api.js',
          defer: true
        },
      ],
    },
  },
  site: {
    url: process.env.SITE_URL || 'https://solid-rock.co.za',
    name: 'Solid Rock Business Solutions',
    description: 'Integrated Finance and HR solutions that are practical, tailored, and directly aligned to strategy execution',
  },
  sitemap: {
    autoLastmod: true,
    autoI18n: false
  },
  robots: {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      }
    ]
  },
  schemaOrg: {
    identity: defineOrganization({
      name: 'Solid Rock Business Solutions',
      alternateName: 'Solid Rock',
      description: 'Integrated Finance and HR solutions that are practical, tailored, and directly aligned to strategy execution',
      url: process.env.SITE_URL || 'https://solid-rock.co.za',
      logo: '/images/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Edenvale, Johannesburg',
        addressLocality: 'Johannesburg',
        addressCountry: 'South Africa',
      },
      email: 'info@solid-rock.co.za',
      telephone: '083 387 9951 / 082 793 9655',
      sameAs: [],
    })
  },
  nitro: {
    prerender: {
      routes: ['/', '/about', '/services', '/contact']
    },
    // Configure multipart handling for file uploads
    multipart: {
      fileSize: '10mb',  // Increase max file size to 10MB
    }
  }
})