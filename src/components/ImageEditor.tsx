import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFont, FaImage } from 'react-icons/fa';
import { FaSlidersH } from 'react-icons/fa';

interface ImageEditorProps {
  onComplete: () => void;
}

const ImageEditor = ({ onComplete }: ImageEditorProps) => {
  const [activeTab, setActiveTab] = useState('adjustments');
  
  const tabs = [
    { id: 'adjustments', label: 'Adjustments', icon: <FaSlidersH /> },
    { id: 'text', label: 'Text Watermark', icon: <FaFont /> },
    { id: 'image', label: 'Image Watermark', icon: <FaImage /> },
  ];
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Edit Your Images
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-3 px-4 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-4">
            {activeTab === 'adjustments' && (
              <div>
                <h3 className="font-medium mb-4">Image Adjustments</h3>
                
                {['Brightness', 'Contrast', 'Saturation', 'Hue', 'Opacity', 'Blur'].map((adjustment) => (
                  <div key={adjustment} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <label className="text-sm text-gray-600 dark:text-gray-300">{adjustment}</label>
                      <span className="text-sm text-blue-500">50%</span>
                    </div>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
                
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors">
                  Apply Adjustments
                </button>
              </div>
            )}
            
            {activeTab === 'text' && (
              <div>
                <h3 className="font-medium mb-4">Text Watermark</h3>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    placeholder="© Your Company"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Font Size
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Opacity
                    </label>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer mt-3"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map((pos) => (
                      <button
                        key={pos}
                        className="py-1 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors">
                  Apply Watermark
                </button>
              </div>
            )}
            
            {activeTab === 'image' && (
              <div>
                <h3 className="font-medium mb-4">Image Watermark</h3>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Upload watermark image
                  </p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                    Select Image
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Size
                    </label>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Opacity
                    </label>
                    <input
                      type="range"
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Top Left', 'Top Center', 'Top Right', 'Middle Left', 'Center', 'Middle Right', 'Bottom Left', 'Bottom Center', 'Bottom Right'].map((pos) => (
                      <button
                        key={pos}
                        className="py-1 px-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors">
                  Apply Watermark
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-medium mb-4">Preview</h3>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-80 flex items-center justify-center mb-6">
            <p className="text-gray-500 dark:text-gray-400">Image preview will appear here</p>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Reset Changes
            </button>
            
            <button
              onClick={onComplete}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center hover:shadow-lg transition-shadow"
            >
              Continue to Download
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageEditor;
