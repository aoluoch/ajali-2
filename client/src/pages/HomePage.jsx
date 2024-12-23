import { useEffect, useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import IncidentCard from '../components/IncidentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

const HomePage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");

  // Simulate fetching data
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Simulating an API call
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                { id: '1', title: 'Incident 1', description: 'Description 1', status: 'Under Investigation' },
                { id: '2', title: 'Incident 2', description: 'Description 2', status: 'Resolved' },
                { id: '3', title: 'Incident 3', description: 'Description 3', status: 'Rejected' },
              ]),
            1000
          )
        );
        setIncidents(response);
        setLoading(false);
      } catch {
        setError('Failed to fetch incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesStatus = filter === "All" || incident.status === filter;
    const matchesSearch =
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-6">
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search incidents..."
          className="flex-1 max-w-lg"
        >
          <Search className="text-gray-400" />
        </SearchBar>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 border rounded-lg overflow-hidden">
            <Button
              onClick={() => setView("grid")}
              variant={view === "grid" ? "primary" : "secondary"}
              size="sm"
            >
              Grid
            </Button>
            <Button
              onClick={() => setView("map")}
              variant={view === "map" ? "primary" : "secondary"}
              size="sm"
            >
              Map
            </Button>
          </div>
        </div>
      </div>

      {/* Content View */}
      {filteredIncidents.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
