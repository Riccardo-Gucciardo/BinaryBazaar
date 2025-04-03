# BinaryBazaar Project Setup and Workflow Guide

This document outlines the setup process and workflow for the BinaryBazaar project, divided into Frontend and Backend sections.

## Project Structure Overview

The project is structured as follows:

-   **backend/**: Contains the server-side code (Node.js with Express).
    -   **app.js**: Main server file.
    -   **routers/**: Contains route definitions (e.g., `productRouter.js`).
    -   **controllers/**: Contains controller logic (e.g., `productController.js`).
    -   **data/**: Contains database connection logic (e.g., `db.js`).
-   **frontend/**: Contains the client-side code (React with Vite).
    -   **vite.config.js**: Vite configuration file.
    -   **eslint.config.js**: ESLint configuration file.

## Backend Setup and Workflow

### Step 1: Prerequisites

1.  **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can check this by running `node -v` and `npm -v` in your terminal.
2.  **MySQL:** You need a MySQL server running. You can install it locally or use a cloud-based service.
3.  **Environment Variables:** Create a `.env` file in the `backend` directory. This file will store your database credentials and other sensitive information. Add the following variables to the `.env` file, replacing the placeholders with your actual values:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=binary_bazaar
    SERVER_PORT=3000
    FRONTEND_PORT=http://localhost:5173
    ```

### Step 2: Install Backend Dependencies

1.  Navigate to the `backend` directory in your terminal:

    ```bash
    cd backend
    ```

2.  Initialize npm:
    ```bash
    npm init -y
    ```

3.  Install the required dependencies:

    ```bash
    npm install express cors mysql2 dotenv
    ```

    -   `express`: Web framework for Node.js.
    -   `cors`: Middleware for enabling Cross-Origin Resource Sharing.
    -   `mysql2`: MySQL client for Node.js.
    - `dotenv`: Load environment variables from .env file

### Step 3: Configure the Database

1.  **Create the Database:** Using a MySQL client (like MySQL Workbench or the command line), create a database named `binary_bazaar` (or whatever you specified in your `.env` file).
2. **Check db.js**: verify that the connection to the database is correct.

### Step 4: Run the Backend Server

1.  In the `backend` directory, start the server:

    ```bash
    node app.js
    ```

2.  You should see the message "server in funzione sulla porta: 3000" and "Connessione al DB avvenuta con successo" in your terminal if everything is set up correctly.

### Backend Workflow

1.  **Define Routes:** In `routers/productRouter.js`, define the API endpoints for your application.
2.  **Create Controllers:** In `controllers/`, create controller files (e.g., `productController.js`) to handle the logic for each route.
3.  **Database Interaction:** Use the `connection` object from `data/db.js` to interact with the database within your controllers.
4.  **Test Endpoints:** Use tools like Postman or `curl` to test your API endpoints.

## Frontend Setup and Workflow

### Step 1: Prerequisites

1.  **Node.js and npm:** Ensure you have Node.js and npm installed.
2.  **Text Editor:** Choose a text editor (e.g., VS Code) for development.

### Step 2: Create the Frontend Project

1.  Navigate to the project's root directory in your terminal.
2.  Create the frontend project using Vite:

    ```bash
    npm create vite@latest frontend -- --template react
    ```
    This command will create a new React project in the `frontend` directory.

3. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

### Step 3: Install Frontend Dependencies

1.  Install the required dependencies:

    ```bash
    npm install
    ```

    This will install the dependencies listed in the `package.json` file.

### Step 4: Configure ESLint

1.  The `eslint.config.js` file is already provided. It configures ESLint for React and includes recommended rules.
2.  You can customize the rules further if needed.

### Step 5: Run the Frontend Development Server

1.  In the `frontend` directory, start the development server:

    ```bash
    npm run dev
    ```

2.  This will start the Vite development server, and you can access your application in your browser at `http://localhost:5173` (or the port specified by Vite).

### Frontend Workflow

1.  **Component Development:** Create React components in the `src` directory.
2.  **State Management:** Use React's built-in state management or a library like Redux or Zustand for more complex applications.
3.  **API Calls:** Use `fetch` or a library like `axios` to make API calls to your backend server.
4.  **Testing:** Write tests for your components and logic.
5. **Build**: when you are ready to deploy your project you can run:
    ```bash
    npm run build
    ```

## General Workflow

1.  **Feature Planning:** Plan the features you want to implement.
2.  **Backend Development:** Develop the backend API endpoints and logic.
3.  **Frontend Development:** Develop the frontend components and UI.
4.  **Integration:** Integrate the frontend with the backend by making API calls.
5.  **Testing:** Test the entire application thoroughly.
6.  **Deployment:** Deploy the frontend and backend to a hosting service.

## Additional Notes

-   **Version Control:** Use Git for version control. Create a repository on GitHub, GitLab, or Bitbucket.
-   **Error Handling:** Implement proper error handling in both the frontend and backend.
-   **Security:** Be mindful of security best practices, especially when handling user data.
- **Documentation**: Document your code and project structure.

This guide provides a solid foundation for setting up and developing the BinaryBazaar project. Remember to adapt it to your specific needs and preferences.
