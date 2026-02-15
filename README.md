# Probhat Foundation Website

A production-ready, content-managed website for Probhat Foundation, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/probhat-foundation.git
    cd probhat-foundation
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    ```bash
    cp .env.example .env.local
    ```
    Update `.env.local` with your configuration (optional for local dev, required for forms).

4.  Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure Overview

-   `/app`: Route pages (Home, About, Programs, Donate, Contact). This is where the page layout and structure live.
-   `/content`: MDX content files (the actual text and data for the website).
    -   `/content/pages`: Static page content.
    -   `/content/programs`: Individual program details.
    -   `/content/updates`: News and updates.
    -   `/content/reports`: Place for future impact reports (PDFs, etc.).
-   `/public`: Static assets like images, favicon, `og.png`, and `robots.txt`.
-   `/lib`: Utility functions, including the MDX parser (`mdx.ts`).
-   `/components`: Reusable UI components.

## 📝 Content Management Guide

All content is managed through simple text files (MDX) in the `/content` folder. No coding knowledge is required to update the text.

### 1. How to Update Each Page

#### **Home Page**
-   **Hero Text & Tagline**: Edit `/app/page.tsx`. Look for the "Hero Section" comments.
-   **Transparency Section**: Edit `/app/page.tsx`. Look for "Transparency Section".
-   **Founder's Note**: Edit `/app/page.tsx`. Look for "Founder's Note".
-   **Programs Grid**: Automatically pulls from the `/content/programs` folder.

#### **About Page**
-   **Main Content**: Edit `/content/pages/about.mdx`.
-   **Mission & Vision**: Update the text within the markdown file.

#### **Programs**
-   **Edit Existing**: Open the specific file in `/content/programs/` (e.g., `education.mdx`).
-   **Add New Program**:
    1.  Create a new file in `/content/programs/` (e.g., `new-program.mdx`).
    2.  Add the required "frontmatter" at the top:
        ```yaml
        ---
        title: "Program Title"
        slug: "program-slug"
        icon: "Heart" # Lucide icon name
        summary: "Short description for the card."
        order: 1
        featured: true
        ---
        ```
    3.  Write the full details below the `---` lines.

#### **Donate Page**
-   **Text & Tiers**: Edit `/content/pages/donate.mdx`.
-   **Structure**: The donation logic is in `/app/donate/page.tsx` and `/components/pages/DonateContent.tsx`.

#### **Contact Page**
-   **Content**: Edit `/content/pages/contact.mdx`.

### 2. Updates / News
-   **Add New Update**: Create a new MDX file in `/content/updates/`.
-   **Filename Format**: `YYYY-MM-title.mdx` (e.g., `2024-03-ramadan-drive.mdx`).
-   **Required Frontmatter**:
    ```yaml
    ---
    title: "Update Title"
    date: "2024-03-10"
    summary: "Brief summary."
    tags: ["Category"]
    coverImage: "/images/update-cover.jpg" # Optional, must exist in /public
    ---
    ```

### 3. Updating Contact Info
The contact details (email, phone, address) displayed in the Footer are located in:
-   `/components/layout/Footer.tsx`

### 4. Updating Branding
-   **Navbar Brand Name**: `/components/layout/Header.tsx`
-   **Hero Tagline**: `/app/page.tsx` (or `/content/pages/home.mdx` if configured).

## 🚀 Deployment Notes

1.  **Build**: Before deploying, always run the build command to check for errors:
    ```bash
    npm run build
    ```
2.  **Deploy**: Push your changes to the `main` branch on GitHub. Vercel will automatically detect the change and redeploy.
3.  **Cache**: If you update the Open Graph image (`og.png`) or favicons, you may need to clear your browser cache or the social media platform's cache (e.g., Facebook Debugger) to see the changes immediately.

## 🔮 Future Impact Reports

A folder has been created at `/content/reports` for documenting future initiatives.
-   **Draft Reports**: Create MDX files here (e.g., `first-initiative-2026.mdx`).
-   **Public Page**: These reports will eventually be displayed at `/reports`.
-   **Current Status**: The `/reports` page is currently active but displays a "Coming Soon" message until reports are finalized and published.

---

Built with ❤️ for Probhat Foundation.
