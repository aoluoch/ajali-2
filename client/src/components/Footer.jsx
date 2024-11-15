import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-sm">
          Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> in Kenya
        </p>
        <p className="text-gray-400 text-sm mt-2">
          © {new Date().getFullYear()} Ajali! Emergency Response System
        </p>
        <div className="mt-4">
          <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;