# Nooro Take Home Technical Assessment - Todo App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

Additionally, you need to download and set up the backend system, as the application relies on data provided by it.

### Downloading and Setting Up the Project

1. Download the project zip file from the repository.
2. Extract the zip file to your desired location.
3. Open the extracted folder in Visual Studio Code or your preferred code editor.
4. Create a `.env` file in the root folder of the project and add the following line to configure the API endpoint:

```env
NEXT_PUBLIC_TASK_API_URL=http://localhost:8080/tasks
```

This configuration is required for the application to communicate with the backend API.

### Installing Dependencies

Once the project is open in your editor, install the required dependencies by running the following command in your terminal:

```bash
npm install
```

This command will install all the necessary packages defined in the `package.json` file.

### Running the Development Server

To launch the application locally, run the following command:

```bash
npm run dev
```

This will spin up a local development server. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

If you would like to test with an optimized, production-ready build of the app, run the following commands:

```bash
npm run build
npm start
```
This will still spin up a local development server, but serve an optimized, production-ready application. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the optimized application.

### Backend Requirement

Before running the application, ensure the backend system is set up and running. The backend provides the data necessary for the app to function. Please refer to the backend repository for instructions on how to set it up and start it.

## Key Dependencies

This project uses several key dependencies to enhance functionality and streamline development:

1. **Formik**: Simplifies form management and state handling.
2. **Yup**: Provides schema validation for forms, ensuring robust data input handling.
3. **Tailwind CSS**: Enables rapid and responsive styling with a utility-first CSS framework.
4. **React Context API**: Manages global state efficiently, allowing shared state across the application.

## Learn More

To learn more about Next.js and the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Formik Documentation](https://formik.org/docs/overview) - Learn about managing forms with Formik.
- [Yup Documentation](https://github.com/jquense/yup) - Explore schema validation with Yup.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Get started with Tailwind CSS.
- [React Context API Documentation](https://react.dev/reference/react/useContext) - Understand state management using Context API.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.






