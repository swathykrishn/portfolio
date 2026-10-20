# Portfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.27.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment to GitHub Pages

This project is configured for automated deployment to GitHub Pages via **GitHub Actions**.

### Automated Deployment (GitHub Actions)

1. Ensure GitHub Actions is enabled for GitHub Pages in your repository:
   - Go to **Settings** > **Pages** in your GitHub repository.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
2. Push your changes to the `development` (or `main`) branch:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin development
   ```
3. The workflow in `.github/workflows/deploy.yml` will automatically build the application with `--base-href /portfolio/` and publish it to `https://swathykrishn.github.io/portfolio/`.

### Local GitHub Pages Build

To test the GitHub Pages build locally:
```bash
npm run build:gh-pages
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
