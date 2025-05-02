import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Shield, Clock, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RecentIncidents from '../components/RecentIncidents';
import Container from '../components/Container';
import Card from '../components/Card';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-primary-600 text-white pt-24"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80"
            alt="Emergency Response"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <Container className="relative py-16 sm:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Report Emergencies Instantly
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
              Quick and Easy Incident Reporting for faster Emergency Response
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
              <Link
                to="/login"
                className="inline-block bg-white text-primary-600 px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </motion.section>

      {/* Features Section */}
      <section id="about" className="py-16 bg-white">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <AlertTriangle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Incident</h3>
                <p className="text-gray-600">
                  Quickly submit detailed incident reports with location and media
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Alert</h3>
                <p className="text-gray-600">
                  Authorities are immediately notified of your emergency
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                <p className="text-gray-600">
                  Track response status and get real-time updates
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Emergency Call</h3>
                <p className="text-gray-600">
                  Directly call emergency services with a single tap
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Recent Incidents Section */}
      <RecentIncidents />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary-700 to-primary-800 py-16 sm:py-24"
      >
        <Container className="max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Your Community Safer?
          </h2>
          <p className="text-primary-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are making a difference in their communities through quick incident reporting.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-white text-primary-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Join Us Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Container>
      </motion.section>

      <Footer />
    </div>
  );
};

export default LandingPage;