# Hospital Management Portal

## Description
The Hospital Management Portal is a web-based application that facilitates communication and interaction between doctors and patients. It provides a platform for doctors to manage their patients and for patients to access their assigned doctors.

## Features

### For Doctors
- User authentication (Register and Login)
- Upload and view PDF documents
- Assign patients to their care
- Unassign patients from their care
- View uploaded PDFs

### For Patients
- User authentication (Register and Login)
- View assigned doctor (if any)

## Technologies Used
- Frontend: React
- Backend: Node.js
- Database: PostgreSQL

## Installation

### Prerequisites
Ensure you have the following tools installed on your system:
- Node.js (v18 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

### Installation Steps

1. **Clone the repository:**
https://github.com/1hemant2/Hospital-Management.git


2. **Set up the frontend:**
cd client
npm install
3. change base url to http://localhost:8084 src/api/baseurl
npm run dev

4. **Set up the backend:**
Open a new terminal in the main folder and run:
cd server
npm install

5. **Configure the environment:**
- In the `server` folder, create a `.env` file using `.env.example` as a template.
- Fill in the necessary environment variables.

6. **Configure the database connection:**
- In `src/config/data-source.ts`, uncomment the local `AppDataSource` configuration.
- Comment out the cloud setup configuration.

7. **Start the backend server:**
npm run dev

## Usage
After installation, you can access the application at `http://localhost:5173` (or the port specified for the frontend).

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
[Specify your license here, e.g., MIT]

## Contact
For any queries, please contact [Hemant Kumar] at [hk443957@gmail.com].
