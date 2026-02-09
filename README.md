# Portfolio - React + TypeScript + Vite

Welcome to my personal portfolio project! 🚀

This project is a modern, responsive web application built using **React**, **TypeScript**, and **Vite**. It serves as a showcase for my skills, experience, and projects as a web developer.

## Project Overview

- **Live Preview:** https://portfolio-gilt-ten-7y11irjwxn.vercel.app/
- **Purpose:** The portfolio demonstrates my coding abilities, creative projects, and provides an overview of my professional background.
- **Features:**
  - Home, About Me, Projects, Contact sections
  - Responsive design for mobile and desktop
  - Interactive UI elements and smooth navigation
  - Showcases featured work and skills
  - Contact form for collaborating or networking

## Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** [e.g. Tailwind CSS, styled-components, CSS Modules]
- **Linting:** ESLint (with recommended rules for React and TypeScript)

## Getting Started

To run locally:

```bash
git clone https://github.com/Kmadhav824/Portfolio.git
cd Portfolio
npm install
npm run dev
```

## Customization

You can easily customize sections (like projects and experience) by editing relevant React components.

## ESLint Setup

This template has a basic ESLint setup and provides guidance for enabling type-aware lint rules. For production apps, you can expand the configuration as follows:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for enhanced linting.

## Credits

Built and maintained by [Kmadhav824](https://github.com/Kmadhav824).

---

Feel free to use this template for your own portfolio, and share your feedback or suggestions!
