🌟 Ajali! - Emergency Alert Platform 🚨

Ajali! is a web application designed to empower citizens to report accidents and emergencies instantly. This platform is built for real-time incident reporting, making it easier to track and manage emergencies with rich media, geolocation, and real-time updates.
🌈 Table of Contents

    📝 Project Overview
    💻 Frontend Features & Components
    🔙 Backend Features & Components
    🛠️ Technologies Used
    ⚡ Installation Instructions
    📡 API Endpoints
    🧪 Testing
    🙌 Contributing
    📄 License
    🙏 Acknowledgements

📝 Project Overview

Ajali! is an emergency alert platform designed to help users report accidents and emergencies instantly. The application allows users to create, manage, and view incident reports with images, videos, geolocation, and real-time status updates.
💻 Frontend Features & Components

The frontend of the Ajali! project provides an interactive, user-friendly interface for reporting and managing incidents.
🧩 Key Components

    Landing Page
        Navbar 🧭
        Hero Section 💥
        Features Section 🌟
        How It Works 📘
        Footer 🦶

    Home Page
        User Dashboard 👤
        Incident Overview 📈
        Map Section 🗺️
        Searchbar and Filter Options 🔍

    Create New Incident Page
        Incident Form ✍️
        Attachments Section 📸
        Geolocation Input 📍
        Submit Button 📝

    My Profile Page
        Personal Info Display 🏷️
        Incident Management ⚙️

    Admin Dashboard
        Incident List 📋
        Update Incident Status ✅❌
        Notification Settings 🔔

    Login/Signup Page
        Authentication Form 🔐
        Forgot Password Link 💬

🚀 Highlighted Features

    Real-Time Incident Reporting: Users can report accidents and emergencies in real-time. ⏱️
    Geolocation: Attach location data or manually enter latitude/longitude. 📍
    Media Support: Upload images 📸 and videos 🎥 to enhance incident reports.
    Personalized Dashboard: After logging in, users see a dashboard with their incident status and updates. 🖥️
    Map Integration: Incidents are displayed on a map with pins marking locations. 🌍
    Admin Panel: Admins can approve, reject, or resolve incidents and manage notifications. 🧑‍💻
    Profile Management: Users can view and edit their personal information and incident history. 🏷️

🔙 Backend Features & Components

The backend of Ajali! is built using Flask (Python) to handle user authentication, incident report management, and API endpoints for the frontend.
🔧 Highlighted Features

    User Authentication: Handles registration, login, and session-based authentication. 🔐
    Incident Report Management: Create, edit, and delete incident reports. ✏️🗑️
    Geolocation Support: Record latitude and longitude for each incident. 📍
    Media Support: Upload images and videos to enhance reports. 🎥📸
    Admin Functionalities: Admins can approve, resolve, and reject incidents. ✅❌
    Pagination: API responses support pagination for large datasets. 🔢

🛠️ Technologies Used
🎨 Frontend

    React ⚛️: Component-based framework for building interactive UIs.
    Vite ⚡: Lightning-fast build tool for development.
    Tailwind CSS 🧵: Utility-first CSS framework.
    OpenStreetMap 🗺️: Open-source map provider for displaying locations.
    React-Leaflet 🧭: For map integration.

🖥️ Backend

    Flask 🐍: Micro web framework for building RESTful APIs.
    PostgreSQL 🗄️: Relational database for storing incidents and user profiles.
    Flask-Login 🔐: Manages session-based authentication.
    SQLAlchemy 🔗: ORM for database interaction.
    Flask-Migrate 🛠️: For managing database migrations.

⚡ Installation Instructions
Frontend Installation

    Clone the Frontend Repository

git clone https://github.com/your-repo/ajali-frontend.git
cd ajali-frontend

Install Dependencies

npm install

Start Development Server

    npm run dev

    The frontend app will be available at http://localhost:3000.

Backend Installation

    Clone the Backend Repository

git clone https://github.com/aoluoch/ajali-2.git
cd ajali-2

Create Virtual Environment

pipenv install
pipenv shell

Install Dependencies

pip install -r requirements.txt

Set Up Database and Run Migrations

flask db init
flask db migrate
flask db upgrade

Start the Backend Server

    flask run

    The backend API will be available at http://localhost:5000.

📡 API Endpoints

    User Registration: POST /api/register 📝
    User Login: POST /api/login 🔐
    Create Incident Report: POST /api/reports 🚨
    Edit Incident Report: PUT /api/reports/<report_id> ✏️
    Delete Incident Report: DELETE /api/reports/<report_id> 🗑️
    Get Incident Reports: GET /api/reports 📋
    Admin Update Report Status: PATCH /api/reports/<report_id>/status ⚙️

🧪 Testing

To run backend tests, use:

pytest

Make sure your environment is properly set up before running tests. 🧑‍💻
🙌 Contributing

We welcome contributions from the community! 🎉 To contribute, please follow these steps:

    Fork the Repository 🔄

    Clone the Repository 🚀

git clone https://github.com/your-username/ajali-frontend.git

Create a New Branch 🧑‍💻

git checkout -b feature-name

Make Your Changes ✍️

Commit Your Changes 📝

git commit -m "Description of the changes"

Push to Your Fork ⬆️

    git push origin feature-name

    Create a Pull Request to merge your changes into the main repository. 🤝

📄 License

This project is licensed under the MIT License. See the LICENSE file for more information.
🙏 Acknowledgements

Special thanks to the developers and open-source communities whose tools and libraries helped make this project possible. 🚀

Ajali! – Empowering citizens to report accidents and emergencies instantly, making our communities safer. 🌍💪
Key Highlighting Techniques:

    Bold for important or key terms.
    Italics for emphasis.
    🟢 Emoji for visual appeal and quick scanning.
    Code blocks for commands and technical details.