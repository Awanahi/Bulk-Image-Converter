import { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider = ({ min, max, value, onChange }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative w-full h-6 flex items-center">
      <div className="absolute w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
      <div 
        className="absolute h-2 bg-primary-500 rounded-lg" 
        style={{ width: `${percentage}%` }}
      ></div>
      <div 
        className={`absolute w-4 h-4 rounded-full bg-white border-2 border-primary-500 cursor-pointer transform -translate-y-0 -translate-x-2 transition-shadow ${
          isDragging ? 'shadow-lg' : ''
        }`}
        style={{ left: `${percentage}%` }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      ></div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default Slider;
