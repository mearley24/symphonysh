# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3878c065-e9da-4a6e-bfdb-371ba3159d6e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3878c065-e9da-4a6e-bfdb-371ba3159d6e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This repo is deployed via Netlify (recommended for custom domains). You can also use Lovable for UI changes.

### Supabase (backend)
This project uses Supabase project `bxsdjxkbhjtdrrtjtyto`.

**Contact form:** the `/contact` page calls the Supabase Edge Function `send-contact-email`, which:
- stores submissions in `public.contact_submissions`
- sends emails via Resend (`RESEND_API_KEY` secret required)

To set it up:
1) Apply migrations (includes `20260128_create_contact_submissions.sql`).
2) Deploy edge functions (including `send-contact-email`).
3) Set Supabase function secrets:
   - `RESEND_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (available to functions by default)

If the contact form is returning 500s, the first two things to check are:
- the `contact_submissions` table exists (migration applied)
- `RESEND_API_KEY` is set for the functions environment

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
