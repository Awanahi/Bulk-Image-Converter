import { useImageStore } from '../store/imageStore';
import { motion } from 'framer-motion';
import { FiDownload, FiPackage, FiEye, FiTrash2 } from 'react-icons/fi';

const ImagePreview = () => {
  const { images, removeImage } = useImageStore();
  
  const handleDownloadSingle = (image: any) => {
    const link = document.createElement('a');
    link.href = image.preview;
    link.download = image.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAll = () => {
    // In a real app, this would use JSZip to create a zip file
    // For this demo, we'll just download the first image
    if (images.length > 0) {
      handleDownloadSingle(images[0]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Processed Images ({images.length})
        </h3>
        
        {images.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2 luxury-button text-white rounded-md text-sm font-medium flex items-center"
          >
            <FiPackage className="mr-2" />
            Download All as ZIP
          </button>
        )}
      </div>
      
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="luxury-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square relative group">
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownloadSingle(image)}
                      className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                    >
                      <FiDownload className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {/* Preview logic */}}
                      className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                  {image.file.name}
                </h4>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{image.file.type.split('/')[1].toUpperCase()}</span>
                  <span>{Math.round(image.file.size / 1024)} KB</span>
                </div>
                <button
                  onClick={() => handleDownloadSingle(image)}
                  className="mt-4 w-full py-2 luxury-button text-white rounded-md text-sm font-medium flex items-center justify-center"
                >
                  <FiDownload className="mr-2" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No images to display</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
