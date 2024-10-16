# Database Manager Application

This project is a full-stack web application for managing a PostgreSQL database. The frontend is built with **React**, and the backend uses **Flask** to handle API requests and database interactions.

## Features

- **PostgreSQL Integration**: Seamless management of PostgreSQL databases, including CRUD operations.
- **React Frontend**: A responsive and intuitive user interface for interacting with the database.
- **Flask Backend**: Handles API requests, database queries, and serves the frontend.
- **Modular Design**: Clean separation between frontend and backend components for scalability and maintainability.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **JavaScript/TypeScript**: Handles client-side logic and user interactions.
- **Axios**: For making HTTP requests to the Flask backend.

### Backend
- **Flask**: A Python web framework for building the backend API.
- **PostgreSQL**: A powerful, open-source relational database system.
- **SQLAlchemy**: ORM (Object-Relational Mapping) used for database interactions in Python.

## Project Structure

- **front/**: Contains the React frontend.
  - **src/**: Core source files for the React app.
  - **public/**: Static assets for the frontend.
  
- **server/**: Contains the Flask backend.
  - `server.py`: The main entry point for the Flask server.
  - **serverModules/**: Contains additional modules and utilities for the backend.
  - `requirements.txt`: Lists the required Python packages for the backend.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (v14 or higher) and **npm**: For managing frontend dependencies.
- **Python 3.7+**: For running the Flask backend.
- **PostgreSQL**: For setting up the database.
- **yarn**: Optionally used for managing frontend dependencies.

## Installation

### 1. Clone the repository:

```bash
git clone <repository-url>
cd database-manager-master
```

### 2. Frontend setup:

Navigate to the `front` directory and install dependencies:

```bash
cd front
npm install
```

To run the React development server:

```bash
npm start
```

The frontend should now be running at `http://localhost:3000`.

### 3. Backend setup:

Navigate to the `server` directory and set up the virtual environment:

```bash
cd server
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Set up the PostgreSQL database (ensure the database server is running) and configure the database URL in the backend code.

### 4. Run the backend:

Once the dependencies are installed and the database is set up, start the Flask server:

```bash
python server.py
```

The backend should now be running at `http://localhost:5000`.

## Usage

1. Open the frontend at `http://localhost:3000` in your browser.
2. Use the interface to perform database operations such as adding, updating, or deleting entries.
3. The React app will communicate with the Flask backend, which interacts with the PostgreSQL database.

## Customization

You can extend this project by:

- Adding more API endpoints to manage additional tables or data.
- Improving the user interface with more advanced React components.
- Implementing user authentication for secure access to the database.

## License

This project is open-source and available under the MIT License.

## Contributions

Contributions are welcome! Feel free to fork the repository and submit pull requests to improve the project or add new features.
