import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeSteps from './components/WelcomeSteps';
import ImageUploader from './components/ImageUploader';
import FormatConverter from './components/FormatConverter';
import ImageEditor from './components/ImageEditor';
import ImageDownloader from './components/ImageDownloader';
import Feedback from './components/Feedback';
import './App.css';

type Step = 'welcome' | 'upload' | 'convert' | 'edit' | 'download' | 'feedback';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const handleGetStarted = () => {
    setCurrentStep('upload');
  };

  const handleReset = () => {
    setCurrentStep('welcome');
  };

  return (
    <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header currentStep={currentStep} onStepChange={handleStepChange} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'welcome' && <WelcomeSteps onGetStarted={handleGetStarted} />}
            {currentStep === 'upload' && <ImageUploader onComplete={() => setCurrentStep('convert')} />}
            {currentStep === 'convert' && <FormatConverter onComplete={() => setCurrentStep('edit')} />}
            {currentStep === 'edit' && <ImageEditor onComplete={() => setCurrentStep('download')} />}
            {currentStep === 'download' && <ImageDownloader onReset={handleReset} />}
            {currentStep === 'feedback' && <Feedback onComplete={handleReset} />}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
