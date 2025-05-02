# Ajali! - Emergency Alert Platform 🚨

## Overview

Ajali! is a modern web application that enables real-time emergency and accident reporting. Built with React and Flask, it provides a robust platform for citizens to report incidents instantly with features like geolocation, media uploads, and real-time status tracking.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0-green.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://www.python.org/)

## ✨ Key Features

- 🔄 Real-time incident reporting and tracking
- 📍 Precise geolocation integration
- 🖼️ Image and video upload support
- 🔐 Secure user authentication
- 📱 Responsive design for all devices
- 🗺️ Interactive map visualization
- 👥 Role-based access control (Admin/User)
- 📊 Real-time status updates

## 🛠️ Tech Stack

### Frontend
- React 18+ with Vite
- Tailwind CSS for styling
- React Router for navigation
- Redux Toolkit for state management
- OpenStreetMap & React-Leaflet for maps

### Backend
- Flask framework
- PostgreSQL database
- SQLAlchemy ORM
- Flask-Login for authentication
- Cloudinary for media storage

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL
- pip and npm

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env  # Then edit .env with your credentials

# Initialize database
flask db upgrade

# Start server
flask run
```

## 📱 Application Structure

### Frontend (/client)
- `/src/components` - Reusable UI components
- `/src/pages` - Main application views
- `/src/api` - API integration
- `/src/store` - Redux state management
- `/src/styles` - Global styles and theme

### Backend (/server)
- `/models` - Database models
- `/routes` - API endpoints
- `/config` - Configuration files
- `/utils` - Helper utilities
- `/migrations` - Database migrations

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your_mapbox_token
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/ajali
SECRET_KEY=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@ajali.com or join our Slack channel.

## ✨ Acknowledgements

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- All our contributors and supporters