# Probhat Foundation Website

A professional nonprofit foundation website built with Next.js, TypeScript, and Tailwind CSS.

**Tagline:** Empowering Communities. Sustaining Futures  
**Bengali:** শক্ত সমাজ, টেকসই ভবিষ্যৎ

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

-   `/src/app`: Route pages (Home, About, Programs, Initiatives, Donate, Contact)
-   `/content`: MDX content files (the actual text and data for the website)
    -   `/content/pages`: Static page content (home, about, donate, initiatives, contact)
    -   `/content/programs`: Individual program details (4 programs)
    -   `/content/updates`: News and updates
    -   `/content/reports`: Place for future impact reports
-   `/public`: Static assets like images, favicon, and `og.png`
-   `/src/lib`: Utility functions, including the MDX parser
-   `/src/components`: Reusable UI components

## 📝 Content Management Guide

All content is managed through simple text files (MDX) in the `/content` folder. No coding knowledge is required to update the text.

### 1. How to Update Each Page

#### **Home Page**

The homepage pulls content from `/content/pages/home.mdx`. Edit this file to update:

-   **Tagline**: Change `heroTagline` and `heroBengaliTagline` in the frontmatter
    ```yaml
    heroTagline: "Empowering Communities. Sustaining Futures"
    heroBengaliTagline: "শক্ত সমাজ, টেকসই ভবিষ্যৎ"
    ```
-   **Description**: Update the `description` field
-   **Our Approach Section**: Edit the `approach` section
-   **Transparency Items**: Update the `transparency.items` list
-   **Programs & Initiatives Title**: Change `updatesTitle`

**Impact Snapshot Numbers**: To update the statistics (Communities Served, Programs Initiated, Volunteers Engaged), edit `/src/app/page.tsx` around line 54-66.

#### **About Page**

-   **Main Content**: Edit `/content/pages/about.mdx`
-   **Mission, Leadership, Values**: Update the text within the markdown file
-   **Last Updated**: Change the `lastUpdated` field in frontmatter

#### **Programs**

We have 4 core programs:
1. Education Support (`education.mdx`)
2. Healthcare Assistance (`healthcare.mdx`)
3. Community Development (`community.mdx`)
4. Emergency & Seasonal Aid (`emergency-seasonal.mdx`)

**Edit Existing Program**:
-   Open the specific file in `/content/programs/`
-   Update the frontmatter (title, summary, icon) or the markdown content

**Add New Program**:
1.  Create a new file in `/content/programs/` (e.g., `new-program.mdx`)
2.  Add the required frontmatter:
    ```yaml
    ---
    title: "Program Title"
    slug: "program-slug"
    icon: "Heart" # Lucide icon name (GraduationCap, Heart, Users, HandHeart, etc.)
    summary: "Short description for the card."
    order: 5
    featured: true
    ---
    ```
3.  Write the full program details below the `---` lines

#### **Initiatives Page**

-   **Content**: Edit `/content/pages/initiatives.mdx` for page metadata
-   **Timeline Items**: To add new initiatives, edit `/src/app/initiatives/page.tsx`
-   **2026 Placeholder**: Update the "First Initiative" section in the page component

#### **Donate Page**

-   **Text & Tiers**: Edit `/content/pages/donate.mdx`
-   **Fund Descriptions**: Update `funds.general` and `funds.zakat`
-   **Donation Tiers**: Modify the `donationTiers` array
-   **Payment Methods**: Update the `paymentMethods` array with current details
-   **Transparency Note**: Edit `transparencyNote` and `transparencyPromise`

#### **Contact Page**

-   **Content**: Edit `/content/pages/contact.mdx`

### 2. Updates / News

-   **Add New Update**: Create a new MDX file in `/content/updates/`
-   **Filename Format**: `YYYY-MM-title.mdx` (e.g., `2026-03-initiative-launch.mdx`)
-   **Required Frontmatter**:
    ```yaml
    ---
    title: "Update Title"
    date: "2026-03-10"
    summary: "Brief summary."
    tags: ["Category"]
    coverImage: "/images/update-cover.jpg" # Optional
    ---
    ```

### 3. Updating Contact Info

The contact details (email, phone, address) displayed in the Footer are located in:
-   `/src/components/layout/Footer.tsx`

### 4. Updating Branding & Navigation

-   **Navbar Brand Name**: `/src/components/layout/Header.tsx`
-   **Navigation Items**: Edit the `navigation` array in `/src/components/layout/Header.tsx`
-   **Hero Tagline**: `/content/pages/home.mdx` (frontmatter)

### 5. Updating Colors & Design

The website uses a premium nonprofit color palette designed to feel calm, trustworthy, and institutional:
-   **Primary Navy**: #0B3566 (nonprofit-blue) - Deeper navy for headings
-   **Blue-Tinted Background**: #F3F8FC (light-blue) - Soft blue background
-   **Warm Accent**: #F29B4B (warm-accent) - Softer orange for CTAs

To update colors, edit:
-   `/tailwind.config.ts` - Color definitions
-   `/src/app/globals.css` - CSS variables

## 🚀 Deployment Notes

### Building for Production

1.  **Build**: Before deploying, always run the build command to check for errors:
    ```bash
    npm run build
    ```

2.  **Test Build Locally**:
    ```bash
    npm run start
    ```

### Deploying to Vercel

1.  **Connect Repository**: Link your GitHub repository to Vercel
2.  **Auto-Deploy**: Push changes to the `main` branch - Vercel will automatically detect and redeploy
3.  **Environment Variables**: Set any required environment variables in Vercel dashboard
4.  **Cache**: If you update the Open Graph image (`og.png`) or favicons, you may need to clear cache

### Manual Deployment

If deploying manually:
```bash
npm run build
# Upload the .next folder and other required files to your hosting
```

## 🔮 Future Impact Reports

A folder has been created at `/content/reports` for documenting future initiatives.
-   **Draft Reports**: Create MDX files here (e.g., `first-initiative-2026.mdx`)
-   **Public Page**: These reports will eventually be displayed at `/reports`
-   **Current Status**: The `/reports` page is currently active but displays a "Coming Soon" message until reports are finalized

## 🎨 Design Philosophy

The website follows a mature nonprofit institutional design:
-   **Light & Professional**: Clean white backgrounds with subtle blue accents
-   **Structured**: Clear hierarchy and organized sections
-   **Trustworthy**: Professional typography and consistent spacing
-   **Accessible**: High contrast ratios and readable fonts

## 📊 Key Pages

- **Home** (`/`) - Hero, impact snapshot, programs, approach, transparency
- **About** (`/about`) - Mission, leadership, values, approach
- **Programs** (`/programs`) - All 4 core programs
- **Initiatives** (`/initiatives`) - Timeline of initiatives and impact documentation
- **Donate** (`/donate`) - General Fund, Zakat Fund, payment methods
- **Contact** (`/contact`) - Contact form and information

---

Built with integrity for Probhat Foundation.
