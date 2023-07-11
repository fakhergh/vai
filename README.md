## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Or [Click here](https://vai-bice.vercel.app) to test the deployed application online, as well as you can use the credentials below to sign in to the app.

| Email         | Password | Role  |
|---------------|----------|-------|
| admin@vai.com | 0000     | ADMIN |

## Tech-Stack

- This project is developed with NextJs framework as it is advanced tech that supports several features such as: Routing
  and nested layouts, built-in optimizations (images, fonts...), SSR, etc...


- The used libraries are the following:

| Library     | Description                                                                                                                        | Link                                       |
|-------------|------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| Material UI | UI styling                                                                                                                         | https://github.com/jaredpalmer/formik      |
| Notistack   | Displaying UI snackbars                                                                                                            | https://github.com/iamhosseindhv/notistack |
| Axios       | Making http api calls                                                                                                              | https://github.com/TanStack/query          |
| React Query | Handling http requests promises and used as a server state manager that store the incoming responses from the server automatically | https://github.com/TanStack/query          |
| Formik      | Creating forms                                                                                                                     | https://github.com/jaredpalmer/formik      |
| Yup         | Creating schema validators for formik forms                                                                                        | https://github.com/jquense/yup             |
| Storybook   | Running and testing UI components in an isolated environment                                                                       | https://github.com/storybookjs/storybook   |

## Architecture

- In this project, we follow the MVVM architecture to separate the business logic of the application from the user
  interface:
  - First, we created our UI components to only display data passed as props.
  - Then, we created our business logic such as: managing local state and custom react-query hooks based on the asynchronous functions of the api service.
  - Finally, We used the containers components to combine the business logic and the UI components.


- This approach aims to:
  - create a well-structured project.
  - making the components/login-functions testing easier.
  - clean and maintainable code.
  - get a high app performance.

## Deployment

This application is deployed on Vercel cloud using its CI/CD feature.