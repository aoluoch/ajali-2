import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import Button from './Button.jsx';

const RecentIncidents = () => {
  // Mock data - in real app, fetch from API
  const incidents = [
    {
      id: 1,
      title: "Traffic Accident on Uhuru Highway",
      location: "Nairobi CBD",
      time: "2 hours ago",
      type: "Accident",
      severity: "high"
    },
    {
      id: 2,
      title: "Fire Outbreak at Industrial Area",
      location: "Industrial Area",
      time: "5 hours ago",
      type: "Fire",
      severity: "high"
    },
    {
      id: 3,
      title: "Power Line Down",
      location: "Westlands",
      time: "1 day ago",
      type: "Infrastructure",
      severity: "medium"
    }
  ];

  return (
    <section id="incidents" className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Recent Incidents</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Stay informed about recent incidents in your area
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {incidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="p-4 sm:p-6 flex-grow">
                <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 ${
                  incident.severity === 'high' 
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {incident.type}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {incident.title}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary-500 shrink-0" />
                    <span className="truncate">{incident.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary-500 shrink-0" />
                    <span>{incident.time}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs sm:text-sm"
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
          >
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            View All Incidents
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentIncidents;