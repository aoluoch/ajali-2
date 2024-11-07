import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Shield, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-red-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80"
            alt="Emergency Response"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Report Emergencies Instantly
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Quick and easy incident reporting for faster emergency response
            </p>
            <Link
              to="/report"
              className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Report an Incident
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Incident</h3>
              <p className="text-gray-600">
                Quickly submit detailed incident reports with location and media
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Alert</h3>
              <p className="text-gray-600">
                Authorities are immediately notified of your emergency
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Track response status and get real-time updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Emergency Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                <Phone className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">Emergency</h3>
                  <p className="text-red-600 font-bold">911</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                <Phone className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">Police</h3>
                  <p className="text-red-600 font-bold">999</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                <Phone className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">Fire Department</h3>
                  <p className="text-red-600 font-bold">998</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}