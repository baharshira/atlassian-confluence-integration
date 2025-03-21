# App Setup Guide

This guide will walk you through the process of setting up and starting the application on your local machine.

## Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your computer.

## Step-by-Step Setup

### Step 1: Attach Environment Configuration

Before running the application, make sure to attach the `.env` file provided in the email. This file contains all the necessary environment variables required for the app to run correctly.

- Place the `.env` file in the root directory of the project.

### Step 2: Install Dependencies

Open your terminal and navigate to the project directory. Run the following command to install all the dependencies listed in `package.json`:

`npm install`

### Step 3: Start the Application

Once the dependencies are installed, you can start the application by running:

`npm run start`

This command runs the `start` script defined in `package.json` and starts the app.

### Step 4: Access the Application

Open your web browser and go to the following URL to access the login page of the app:

`http://localhost:3000/auth/login`
