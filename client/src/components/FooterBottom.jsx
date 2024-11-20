import { Heart } from 'lucide-react';

const FooterBottom = () => {
  return (
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Ajali! All rights reserved.
        </p>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-primary-500" /> in Kenya
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
