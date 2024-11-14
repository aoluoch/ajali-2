# Ajali Website - Front-End Design

Ajali! is an emergency alert platform that empowers citizens to instantly report accidents and emergencies. This README provides an overview of the front-end design, features, installation instructions, and other relevant details for contributing to the Ajali! website.

---

## Table of Components

1. **Landing Page**
   - Navbar
   - Hero Section
   - Features Section
   - How It Works
   - Footer

2. **Home Page**
   - User Dashboard
   - Incident Overview
   - Map Section
   - Searchbar and Filter Options

3. **Create New Incident Page**
   - Incident Form
   - Attachments Section
   - Geolocation Input
   - Submit Button

4. **My Profile Page**
   - Personal Info Display
   - Incident Management (Edit/Delete)

5. **Admin Dashboard**
   - Incident List and Management
   - Update Incident Status
   - Notification Settings

6. **Login/Signup Page**
   - User Authentication Form
   - Forgot Password Link

---

## Features

- **Real-Time Incident Reporting**: Users can report accidents and emergencies in real time.
- **Geolocation**: Users can attach the incident's location or manually enter latitude/longitude.
- **Media Support**: Users can upload images and videos to support their incident reports.
- **Personalized Dashboard**: After login, users see a dashboard displaying their incidents with status updates.
- **Search & Filter**: Users can search for incidents by title and filter by status ("Under Investigation," "Resolved," "Rejected").
- **Map Integration**: The map shows incident locations with pins, allowing users to view incidents nearby.
- **Admin Panel**: Admins can monitor, approve, reject, or resolve incidents and manage notifications.
- **Profile Management**: Users can view and edit their profiles and manage their reported incidents.

---

## Technologies Used

- **Frontend**:
  - React (for component-based UI)
  - Vite (for fast build and development environment)
  - Tailwind CSS (for responsive, utility-first design)
  - OpenStreetMap (for geolocation and mapping)
  - React-Leaflet (for map integration)
  
- **Backend** (For Integration):
  - Flask (REST API to handle incident reports and user data)
  - PostgreSQL (for storing incidents and user profiles)

---

## Installation

To set up and run the Ajali! website frontend locally, follow the steps below:

### Prerequisites

- Node.js (v16 or higher)
- npm (Node Package Manager)
- Git (for version control)
- A backend API server (Flask-based) running locally or remotely

### Steps to Install

1. **Clone the Repository**

   git clone https://github.com/aoluoch/ajali-2
   cd ajali-2

2.  **Install Dependencies**

    Install the required npm packages:

    `npm install`

3.  **Start Development Server**

    Run the development server using Vite:

    `npm run dev`

    The website will be available at `http://localhost:3000`.

* * * * *

Usage
-----

-   **Landing Page**: Displays introductory information about the platform and its features.
-   **User Dashboard**: After logging in, the user can see and manage their incidents, search for incidents, and filter by status.
-   **Create New Incident**: Users can report new incidents by filling out a form and attaching media and geolocation.
-   **Profile Management**: Users can view their personal information and edit or delete their reported incidents.
-   **Admin Dashboard**: Admin users can view all incidents, change statuses, and configure notification settings.

* * * * *

Contributing
------------

We welcome contributions from the community! To contribute to this project, follow the steps below:

1.  **Fork the Repository**:

    -   Click on the "Fork" button at the top right of the repository page.
2.  **Clone the Forked Repository**:


    `git clone https://github.com/your-username/ajali-frontend.git`

3.  **Create a New Branch**:

   
    `git checkout -b feature-name`

4.  **Make Changes**: Implement your changes in the code.

5.  **Commit Changes**:

    `git add .
    git commit -m "Add a descriptive commit message"`

6.  **Push to Your Fork**:


    `git push origin feature-name`

7.  **Create a Pull Request**: Open a pull request to merge your changes into the main repository.

* * * * *

MIT License
-----------

This project is licensed under the MIT License - see the <LICENSE> file for details.

* * * * *

**Ajali!** -- Emergency Alerts Made Easy. Empowering citizens to report accidents and emergencies instantly.

csharp

 `This version of the README specifically focuses on the **frontend** components, features, and installation for the Ajali! project. The backend integration details have been kept minimal, as it is only relevant for how the frontend interacts with the API.`