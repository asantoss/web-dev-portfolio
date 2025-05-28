# Web Dev Portfolio

[![Production Deploy](https://github.com/asantoss/web-dev-portfolio/actions/workflows/build.yml/badge.svg)](https://github.com/asantoss/web-dev-portfolio/actions/workflows/build.yml)

🌐 **Live Site:** [alexsantos.dev](http://alexsantos.dev)

A modern, full-stack personal portfolio and blog built with SvelteKit. This project showcases my web development skills and serves as a platform for sharing insights and experiences in software development.

## ✨ Features

- **Modern SvelteKit Frontend** - Fast, reactive UI with server-side rendering
- **Content Management** - Blog posts with markdown support and frontmatter
- **Dark/Light Theme** - Automatic system preference detection with manual toggle
- **Admin Interface** - Sveltia CMS integration for content management
- **OAuth Authentication** - GitHub OAuth for secure admin access
- **Image Processing** - Dynamic image optimization with Sharp
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **Testing Suite** - Unit and E2E testing with Vitest and Playwright
- **CI/CD Pipeline** - Automated deployment with GitHub Actions

## 🛠️ Tech Stack

### Frontend
- **[SvelteKit](https://kit.svelte.dev/)** - Meta-framework for building web applications
- **[Svelte 5](https://svelte.dev/)** - Component-based UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide Svelte](https://lucide.dev/)** - Beautiful SVG icons

### Backend & Content
- **[Node.js](https://nodejs.org/)** - Server runtime

### Content Management
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** - Git-based headless CMS
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parser
- **[Marked](https://marked.js.org/)** - Markdown parser and compiler

### Image Processing
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

### Authentication & OAuth
- **[Simple OAuth2](https://github.com/lelylan/simple-oauth2)** - OAuth 2.0 client
- **GitHub OAuth** - Secure authentication for admin access

### Development & Testing
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Deployment & Infrastructure
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[Coolify](https://coolify.io/)** - Self-hosted deployment platform
- **[Docker](https://docker.com/)** - Containerization

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm or your preferred package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/asantoss/web-dev-portfolio.git
   cd web-dev-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   GITHUB_CLIENT_ID=your_github_oauth_client_id
   GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Content Management

### Creating Posts
Posts are stored as Markdown files in `src/posts/` with frontmatter:

```markdown
---
title: Your Post Title
description: A brief description
image: /images/your-image.png
draft: false
tags: ["web-development", "svelte"]
date: 2025-05-28T09:21:00
---

Your markdown content here...
```

### Admin Interface
Access the admin panel at `/admin` to manage content through the Sveltia CMS interface. Authentication is handled via GitHub OAuth.

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run check            # Type checking with svelte-check

# Testing
npm run test             # Run all tests
npm run test:unit        # Run unit tests
npm run test:e2e         # Run end-to-end tests
```

## 🏗️ Project Structure

```
src/
├── app.html              # HTML template
├── app.css               # Global styles
├── components/           # Reusable components
├── lib/
│   ├── icons/           # SVG icon components
│   ├── server/          # Server-side utilities
│   └── stores/          # Svelte stores
├── posts/               # Markdown blog posts
├── routes/              # SvelteKit routes
└── types/               # TypeScript type definitions
```

## 🚀 Deployment

The project is configured for deployment with:

1. **GitHub Actions** - Automated CI/CD pipeline
2. **Coolify** - Self-hosted deployment platform
3. **Docker** - Containerized deployment

The deployment process:
1. Push to main branch triggers GitHub Action
2. Action builds and pushes Docker image
3. Coolify deploys the updated container

## 🤝 Contributing

This is a personal portfolio project, but I welcome suggestions and feedback! Feel free to:

1. Open an issue for bug reports or feature requests
2. Submit a pull request for improvements
3. Share feedback on the live site

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

Built with ❤️ by Alexander Santos - a passionate software consultant specializing in modern web development, Salesforce solutions, and creative problem-solving.

**Connect with me:**
- 🌐 [alexsantos.dev](http://alexsantos.dev)
- 📧 [asantos@lightningleap.us](mailto:asantos@lightningleap.us)
- 💼 [LinkedIn](https://linkedin.com/in/asantoss96)
- 🐙 [GitHub](https://github.com/asantoss)