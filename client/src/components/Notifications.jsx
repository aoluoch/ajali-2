import { Bell, CheckCircle, UserPlus, Wrench } from 'lucide-react'; // Importing icons

const Notifications = () => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-4">Notifications</h2>
            <ul className="space-y-4">
                <li className="flex items-center p-4 bg-[var(--color-neutral-100)] rounded-lg shadow hover:bg-[var(--color-primary-100)] transition duration-200">
                    <Bell className="text-[var(--color-primary-500)] mr-3" />
                    <span className="text-lg text-[var(--color-neutral-800)]">New incident reported.</span>
                </li>
                <li className="flex items-center p-4 bg-[var(--color-neutral-100)] rounded-lg shadow hover:bg-[var(--color-primary-100)] transition duration-200">
                    <CheckCircle className="text-green-500 mr-3" />
                    <span className="text-lg text-[var(--color-neutral-800)]">Incident resolved.</span>
                </li>
                <li className="flex items-center p-4 bg-[var(--color-neutral-100)] rounded-lg shadow hover:bg-[var(--color-primary-100)] transition duration-200">
                    <UserPlus className="text-blue-500 mr-3" />
                    <span className="text-lg text-[var(--color-neutral-800)]">New user registered.</span>
                </li>
                <li className="flex items-center p-4 bg-[var(--color-neutral-100)] rounded-lg shadow hover:bg-[var(--color-primary-100)] transition duration-200">
                    <Wrench className="text-yellow-500 mr-3" />
                    <span className="text-lg text-[var(--color-neutral-800)]">System maintenance scheduled.</span>
                </li>
            </ul>
        </div>
    );
};

export default Notifications;
