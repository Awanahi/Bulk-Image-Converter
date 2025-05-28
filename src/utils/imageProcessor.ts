import imageCompression from 'browser-image-compression';
import { EditSettings } from '../store/imageStore';

// Helper function to create a canvas with the image
const createCanvas = (img: HTMLImageElement, width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  return canvas;
};

// Apply CSS filters to the image
const applyFilters = (
  canvas: HTMLCanvasElement, 
  settings: EditSettings
): HTMLCanvasElement => {
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Create a temporary canvas to apply filters
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  
  if (!tempCtx) {
    throw new Error('Could not get temporary canvas context');
  }
  
  // Draw the original image to the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);
  
  // Apply CSS filters
  tempCtx.filter = `
    opacity(${settings.opacity / 100})
    brightness(${settings.brightness / 100})
    contrast(${settings.contrast / 100})
    saturate(${settings.saturation / 100})
    hue-rotate(${settings.hue}deg)
  `;
  
  // Apply vibrance (custom implementation since CSS doesn't have vibrance)
  // This is a simplified approximation
  if (settings.vibrance !== 0) {
    // For vibrance, we'll use a combination of saturation and contrast
    const vibranceFactor = 1 + (settings.vibrance / 200);
    tempCtx.filter += ` saturate(${vibranceFactor})`;
  }
  
  // Clear the main canvas and draw the filtered image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0);
  
  return canvas;
};

// Add watermark to the image
const addWatermark = async (
  canvas: HTMLCanvasElement,
  watermarkSettings: EditSettings['watermark']
): Promise<HTMLCanvasElement> => {
  if (!watermarkSettings.enabled) {
    return canvas;
  }
  
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Set watermark opacity
  ctx.globalAlpha = watermarkSettings.opacity / 100;
  
  // Calculate position
  let x = 0;
  let y = 0;
  let watermarkWidth = 0;
  let watermarkHeight = 0;
  
  if (watermarkSettings.type === 'text') {
    // Text watermark
    const fontSize = Math.floor((canvas.width * watermarkSettings.size) / 100);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 20;
    
    const textMetrics = ctx.measureText(watermarkSettings.text);
    watermarkWidth = textMetrics.width;
    watermarkHeight = fontSize;
    
    // Calculate position based on selected position
    switch (watermarkSettings.position) {
      case 'top-left':
        x = 20;
        y = 20 + fontSize;
        break;
      case 'top-right':
        x = canvas.width - watermarkWidth - 20;
        y = 20 + fontSize;
        break;
      case 'bottom-left':
        x = 20;
        y = canvas.height - 20;
        break;
      case 'bottom-right':
        x = canvas.width - watermarkWidth - 20;
        y = canvas.height - 20;
        break;
      case 'center':
        x = (canvas.width - watermarkWidth) / 2;
        y = (canvas.height + fontSize) / 2;
        break;
    }
    
    // Draw text with stroke for better visibility
    ctx.strokeText(watermarkSettings.text, x, y);
    ctx.fillText(watermarkSettings.text, x, y);
  } else if (watermarkSettings.type === 'image' && watermarkSettings.image) {
    // Image watermark
    const img = new Image();
    
    // Create a promise to handle image loading
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load watermark image'));
      img.src = watermarkSettings.image || '';
    });
    
    // Calculate watermark dimensions
    watermarkWidth = (canvas.width * watermarkSettings.size) / 100;
    watermarkHeight = (watermarkWidth / img.width) * img.height;
    
    // Calculate position based on selected position
    switch (watermarkSettings.position) {
      case 'top-left':
        x = 20;
        y = 20;
        break;
      case 'top-right':
        x = canvas.width - watermarkWidth - 20;
        y = 20;
        break;
      case 'bottom-left':
        x = 20;
        y = canvas.height - watermarkHeight - 20;
        break;
      case 'bottom-right':
        x = canvas.width - watermarkWidth - 20;
        y = canvas.height - watermarkHeight - 20;
        break;
      case 'center':
        x = (canvas.width - watermarkWidth) / 2;
        y = (canvas.height - watermarkHeight) / 2;
        break;
    }
    
    // Draw the watermark image
    ctx.drawImage(img, x, y, watermarkWidth, watermarkHeight);
  }
  
  // Reset opacity
  ctx.globalAlpha = 1;
  
  return canvas;
};

// Main function to apply all edits to an image
export const applyImageEdits = async (
  file: File,
  settings: EditSettings
): Promise<string> => {
  try {
    // Compress the image if needed
    let processedFile = file;
    
    if (settings.compression < 100) {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: settings.compression / 100,
      };
      
      processedFile = await imageCompression(file, options);
    }
    
    // Create an image element from the file
    const img = new Image();
    const imageUrl = URL.createObjectURL(processedFile);
    
    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
    
    // Create a canvas with the image dimensions
    const canvas = createCanvas(img, img.width, img.height);
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Draw the original image
    ctx.drawImage(img, 0, 0);
    
    // Apply filters
    const filteredCanvas = applyFilters(canvas, settings);
    
    // Add watermark if enabled
    const finalCanvas = await addWatermark(filteredCanvas, settings.watermark);
    
    // Convert to the desired format
    let mimeType = 'image/jpeg';
    if (settings.format !== 'original') {
      switch (settings.format) {
        case 'png':
          mimeType = 'image/png';
          break;
        case 'webp':
          mimeType = 'image/webp';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'bmp':
          mimeType = 'image/bmp';
          break;
        case 'tiff':
          mimeType = 'image/tiff';
          break;
        case 'avif':
          mimeType = 'image/avif';
          break;
        default:
          mimeType = 'image/jpeg';
      }
    } else {
      // Use the original format
      mimeType = file.type;
    }
    
    // Convert canvas to data URL
    const dataUrl = finalCanvas.toDataURL(mimeType, settings.quality / 100);
    
    // Clean up
    URL.revokeObjectURL(imageUrl);
    
    return dataUrl;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};
