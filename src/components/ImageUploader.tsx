import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaArrowRight } from 'react-icons/fa';

interface ImageUploaderProps {
  onComplete: () => void;
}

const ImageUploader = ({ onComplete }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upload Your Images
      </motion.h2>
      
      <motion.div 
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-8 transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FaUpload className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Drag & Drop Images Here</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Or click to select files from your device
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Select Images
        </label>
      </motion.div>
      
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Selected Images ({files.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removeFile(index)}
                    className="text-white bg-red-500 rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={onComplete}
              disabled={files.length === 0}
              className={`px-6 py-2 rounded-lg flex items-center mx-auto ${
                files.length > 0
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-shadow'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Convert
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
