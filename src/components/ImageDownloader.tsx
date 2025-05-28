import { motion } from 'framer-motion';
import { FaDownload, FaFileArchive, FaRedo } from 'react-icons/fa';

interface ImageDownloaderProps {
  onReset: () => void;
}

const ImageDownloader = ({ onReset }: ImageDownloaderProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Download Your Images
      </motion.h2>
      
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Processed Images</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-md mr-3"></div>
                      <div>
                        <p className="font-medium">image_{item}.jpg</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Converted to JPEG • 250KB</p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                      <FaDownload />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Download Options</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-64 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Individual Downloads</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download each image separately by clicking the download icon next to each image.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Batch Download</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download all processed images at once as a ZIP file.
                  </p>
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow">
                <FaFileArchive className="mr-2" />
                Download All as ZIP
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All done! Your images have been processed successfully.
          </p>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center mx-auto hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaRedo className="mr-2" />
            Process More Images
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageDownloader;
