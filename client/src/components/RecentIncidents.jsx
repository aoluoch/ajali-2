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
    <section id="incidents" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Recent Incidents</h2>
          <p className="mt-4 text-gray-600">Stay informed about recent incidents in your area</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {incidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300"
            >
              <div className="p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  incident.severity === 'high' 
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {incident.type}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{incident.title}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                    {incident.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary-500" />
                    {incident.time}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            className="inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            View All Incidents
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentIncidents;