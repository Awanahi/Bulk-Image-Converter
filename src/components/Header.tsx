import { motion } from 'framer-motion';
import { FaHome, FaComments } from 'react-icons/fa';

interface HeaderProps {
  currentStep: 'welcome' | 'upload' | 'convert' | 'edit' | 'download' | 'feedback';
  onStepChange: (step: 'welcome' | 'upload' | 'convert' | 'edit' | 'download' | 'feedback') => void;
}

const Header = ({ currentStep, onStepChange }: HeaderProps) => {
  const steps = [
    { id: 'welcome', label: 'Home', icon: <FaHome /> },
    { id: 'feedback', label: 'Feedback', icon: <FaComments /> },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              ImageMaster
            </h1>
            <span className="ml-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full">
              Beta
            </span>
          </motion.div>
          
          <nav className="flex space-x-1 md:space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id as any)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
                  currentStep === step.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-1">{step.icon}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
