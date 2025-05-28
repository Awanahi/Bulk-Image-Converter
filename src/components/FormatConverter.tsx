import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCompress } from 'react-icons/fa';

interface FormatConverterProps {
  onComplete: () => void;
}

const FormatConverter = ({ onComplete }: FormatConverterProps) => {
  const [selectedFormat, setSelectedFormat] = useState('jpeg');
  const [quality, setQuality] = useState(80);
  
  const formats = [
    { value: 'jpeg', label: 'JPEG', description: 'Best for photos and complex images' },
    { value: 'png', label: 'PNG', description: 'Supports transparency, good for graphics' },
    { value: 'webp', label: 'WebP', description: 'Modern format with good compression' },
    { value: 'gif', label: 'GIF', description: 'Supports animation, limited colors' },
    { value: 'tiff', label: 'TIFF', description: 'High quality, large file size' },
    { value: 'avif', label: 'AVIF', description: 'Next-gen format with excellent compression' },
    { value: 'heif', label: 'HEIF', description: 'High efficiency format used by iOS' },
    { value: 'bmp', label: 'BMP', description: 'Uncompressed bitmap format' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Convert Image Format
      </motion.h2>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4">Select Output Format</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {formats.map((format) => (
            <div
              key={format.value}
              onClick={() => setSelectedFormat(format.value)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedFormat === format.value
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <h4 className="font-medium">{format.label}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{format.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold flex items-center">
              <FaCompress className="mr-2 text-blue-500" />
              Compression Quality
            </h3>
            <span className="text-blue-500 font-medium">{quality}%</span>
          </div>
          
          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Lower Quality (Smaller Size)</span>
            <span>Higher Quality (Larger Size)</span>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center mx-auto hover:shadow-lg transition-shadow"
          >
            Continue to Edit
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FormatConverter;
