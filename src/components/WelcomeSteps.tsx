import { motion } from 'framer-motion';
import { FaUpload, FaExchangeAlt, FaPencilAlt, FaDownload } from 'react-icons/fa';

interface WelcomeStepsProps {
  onGetStarted: () => void;
}

const WelcomeSteps = ({ onGetStarted }: WelcomeStepsProps) => {
  const steps = [
    {
      icon: <FaUpload className="text-blue-500 text-3xl" />,
      title: 'Upload Images',
      description: 'Drag & drop or select multiple images to begin processing.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <FaExchangeAlt className="text-purple-500 text-3xl" />,
      title: 'Convert Format',
      description: 'Choose from multiple formats including JPEG, PNG, WebP, and more.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <FaPencilAlt className="text-indigo-500 text-3xl" />,
      title: 'Edit & Enhance',
      description: 'Adjust brightness, contrast, add watermarks, and more.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: <FaDownload className="text-green-500 text-3xl" />,
      title: 'Download',
      description: 'Save individual images or download all as a ZIP file.',
      color: 'from-green-500 to-green-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transform Your Images with Ease
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A powerful, browser-based image conversion and editing tool. No uploads required - everything happens right in your browser.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="luxury-card bg-white dark:bg-gray-800 p-6"
            variants={item}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
            <div className={`h-1 w-20 mt-4 rounded bg-gradient-to-r ${step.color}`}></div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <button
          onClick={onGetStarted}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Get Started
        </button>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No registration required. Free to use.
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeSteps;
