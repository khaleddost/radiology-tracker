# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The project uses pnpm as the package manager:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm generate` - Generate static site

## Code Architecture

This is a Nuxt 3 application for tracking radiology requests in a medical environment. The application uses:

- **Nuxt 3** as the full-stack framework
- **Supabase** for database and authentication (@nuxtjs/supabase)
- **Nuxt UI** for the component library and styling
- **TypeScript** for type safety
- **ESLint** for code linting (@nuxt/eslint)

### Key Structure

- `app.vue` - Root application component with NuxtLayout and NuxtPage
- `pages/index.vue` - Main dashboard showing radiology request statistics and table
- `components/RequestCountdown.vue` - Real-time countdown component showing elapsed time with status indicators
- `layouts/default.vue` - Default layout wrapper
- `nuxt.config.ts` - Main configuration with all modules

### Data Model

The application tracks radiology requests with these key fields:
- Patient information (name, ID)
- Study details (modality, study type)
- Priority levels (urgent, priority, routine)
- Timestamps and location data
- Referring physician information

### Priority System

Time-based priority thresholds are implemented in RequestCountdown component:
- **Urgent**: Warning at 15min, Critical at 30min
- **Priority**: Warning at 60min, Critical at 120min  
- **Routine**: Warning at 240min, Critical at 480min

### Supabase Integration

The application is configured to use Supabase for data persistence and authentication. The main dashboard currently uses sample data but is structured to easily integrate with Supabase queries via `useLazyAsyncData`.

## Development Notes

- The application uses Nuxt UI components (UCard, UTable, UButton, etc.)
- Dark mode support is built-in via Nuxt UI
- Real-time updates are handled through reactive Vue composition
- The RequestCountdown component updates every minute via setInterval