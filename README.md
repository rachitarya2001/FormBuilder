FORM_SUBMISSION - Dynamic Form Builder Web Application

This project is a Dynamic Form Builder Web Application named FORM_SUBMISSION. It is built using React for the frontend (form-builder) and Node.js with MongoDB for the backend (for-backend). This application allows users to create, manage, and submit dynamic forms. It also allows admins to view and manage form responses seamlessly.

#Features
Create Dynamic Forms: Users can create custom forms with different input fields (text, select, checkbox, etc.).
Form Management: Users can view, edit, and delete forms they have created.
Submit Responses: Users can submit responses to forms created by admins.
View Responses: Admins can view responses submitted by users for each form.
User Authentication: Users and admins can sign up, log in, and manage their accounts.
Installation
Follow these steps to set up and run the project on your local machine:

Step 1: Clone the Repository
Clone the repository to your local machine:

bash
Copy code
git clone https://github.com/rachitarya2001/FormBuilder.git
cd FormBuilder

Step 2: Install Dependencies
Backend (for-backend)
Navigate to the for-backend directory:
bash
Copy code
cd for-backend
Install the required dependencies:
bash
Copy code
npm install
This will install the necessary backend dependencies, including:

Express.js: For handling HTTP requests.
Mongoose: To interact with MongoDB.
dotenv: For managing environment variables.
jsonwebtoken: For user authentication and token management.
bcryptjs: For password hashing.
cors: For enabling Cross-Origin Resource Sharing.
Set up your MongoDB database:

You can either use a local MongoDB instance or use MongoDB Atlas for a cloud database.

Update the MongoDB connection URL in the .env file inside the for-backend directory.

Frontend (form-builder)
Navigate to the form-builder directory:
bash
Copy code
cd ../form-builder
Install the required dependencies:
bash
Copy code
npm install
This will install the necessary frontend dependencies, including:

React: The core library for building the user interface.
React Router DOM: For routing and navigation.
Axios: For making HTTP requests to the backend.
Material-UI: For UI components (if you are using Material Design).
React Hook Form: For handling forms and validation.
React Context API / Redux: For state management (if applicable).
Step 3: Running the Application
Start the Backend Server
Navigate to the for-backend directory (if you are not already there).

Start the backend server:

bash
Copy code
npm start
The backend will be running on http://localhost:3000 (or any port configured in the .env file).

Start the Frontend Server
Navigate to the form-builder directory (if you are not already there).

Start the frontend server:

bash
Copy code
npm start
The frontend will be running on http://localhost:3000.

Step 4: Access the Application
Open your browser and go to http://localhost:3000 to view the dynamic form builder and start using the application.
Make sure the backend server is running in parallel so that it can handle API requests.

Conclusion
This FORM_SUBMISSION project is designed to help users create, manage, and submit forms dynamically. It provides an intuitive interface for users and administrators to manage their forms and responses. It can be easily set up and run on your local machine by following the steps above.

