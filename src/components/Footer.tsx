import { FaHeart, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} ImageMaster. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Made with <FaHeart className="inline text-red-500" /> by xBesh Labs
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            ImageMaster is a client-side image processing tool. Your images are processed locally in your browser and are never uploaded to any server.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
            By using this service, you agree to our <a href="#" className="underline hover:text-blue-500">Terms of Service</a> and <a href="#" className="underline hover:text-blue-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
