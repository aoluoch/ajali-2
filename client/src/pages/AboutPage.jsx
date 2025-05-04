import { AlertTriangle, ShieldCheck, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ajali</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering communities through quick and efficient emergency response systems. We're dedicated to making our communities safer, one report at a time.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide a reliable and efficient platform for citizens to report emergencies and incidents, ensuring faster response times and better coordination between communities and emergency services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To create safer, more resilient communities through technology and citizen engagement, where every person has the power to contribute to public safety and emergency response.
              </p>
            </motion.div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Ajali</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Reporting</h3>
                <p className="text-gray-600">Easy and efficient incident reporting system</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reliable Service</h3>
                <p className="text-gray-600">Trusted by communities and authorities</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock emergency assistance</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-600">Built with and for the community</p>
              </motion.div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-primary-50 p-6 rounded-lg text-center"
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-gray-600">Incidents Reported</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-primary-50 p-6 rounded-lg text-center"
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">5K+</p>
              <p className="text-gray-600">Active Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-primary-50 p-6 rounded-lg text-center"
            >
              <p className="text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-gray-600">Response Rate</p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;