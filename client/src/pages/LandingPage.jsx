import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from "../components/EmergencyContactCard";
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div
    className="text-center p-6 bg-[#FFE4D6] rounded-lg transition-transform hover:scale-105"
  >
    <div className="inline-block p-4 bg-[#FF3333] rounded-full mb-4">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-[#B71935]">{title}</h3>
    <p className="text-[#7A0930]">{description}</p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const EmergencyContact = ({ icon: Icon, title, number }) => (
  <div
    className="flex items-center space-x-4 p-4 bg-[#FEF8EF] rounded-lg border-l-4 border-[#FF3333] hover:shadow-lg transition-shadow"
  >
    <Icon className="h-8 w-8 text-[#DB2535]" />
    <div>
      <h3 className="font-semibold text-[#7A0930]">{title}</h3>
      <p className="text-[#FF3333] font-bold text-lg">{number}</p>
    </div>
  </div>
);

EmergencyContact.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF3333] to-[#B71935] text-white">
        <div className="absolute inset-0 bg-black/20">
          <img
            src="/api/placeholder/1200/600"
            alt="Emergency Response"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Ajali! Emergency Alerts Made Easy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#FFE4D6]">
              Quick and Easy Incident Reporting for faster Emergency Response
            </p>
            <Link
              to="/report"
              className="inline-block bg-white text-[#FF3333] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#FFE4D6] transition-colors"
            >
              Report an Incident
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#7A0930]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={AlertTriangle}
              title="Report Incident"
              description="Quickly submit detailed incident reports with location and media"
            />
            <FeatureCard
              icon={Shield}
              title="Instant Alert"
              description="Authorities are immediately notified of your emergency"
            />
            <FeatureCard
              icon={Clock}
              title="Quick Response"
              description="Track response status and get real-time updates"
            />
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="bg-[#FEF8EF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="bg-white rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#7A0930]">
                  Emergency Contacts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <EmergencyContact
                    icon={Phone}
                    title="Emergency"
                    number="911"
                  />
                  <EmergencyContact
                    icon={Phone}
                    title="Police"
                    number="999"
                  />
                  <EmergencyContact
                    icon={Phone}
                    title="Fire Department"
                    number="998"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;