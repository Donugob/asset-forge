# Contributing to Asset Forge

First off, thank you for considering contributing to Asset Forge! It's people like you that make open source such a great community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/asset-forge.git
   cd asset-forge
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env.local` file** by copying `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🛠 Making Changes

* Create a new branch for your feature or bug fix: `git checkout -b feature/my-new-feature`
* Make your changes. Asset Forge uses strict TypeScript, so ensure your types are correct.
* Run `npm run lint` to ensure your code passes ESLint and Prettier rules.
* Run `npm run build` to verify the build completes successfully.

## 📝 Pull Request Process

1. Ensure your code is thoroughly tested and does not break existing templates.
2. Update the `README.md` with details of changes to the API, if applicable.
3. Submit the Pull Request against the `main` branch.
4. Our CI/CD pipeline will automatically run type-checks and linting. If it fails, please fix the errors before requesting a review.

Thank you for contributing!
