import { create } from 'zustand';

export interface EditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  vibrance: number;
  hue: number;
  opacity: number;
  compression: number;
  quality: number;
  format: 'original' | 'jpeg' | 'png' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'avif';
  watermark: {
    enabled: boolean;
    type: 'text' | 'image';
    text: string;
    image: string | null;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    size: number;
    opacity: number;
  };
}

interface ImageData {
  id: string;
  file: File;
  preview: string;
  selected: boolean;
  edited: boolean;
}

interface ImageStore {
  images: ImageData[];
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  removeAllImages: () => void;
  toggleSelectImage: (id: string) => void;
  selectAllImages: () => void;
  deselectAllImages: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  
  addImages: (files) => {
    set((state) => {
      const newImages = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: URL.createObjectURL(file),
        selected: false,
        edited: false,
      }));
      
      return { images: [...state.images, ...newImages] };
    });
  },
  
  removeImage: (id) => {
    set((state) => {
      const imageToRemove = state.images.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      
      return { images: state.images.filter((img) => img.id !== id) };
    });
  },
  
  removeAllImages: () => {
    set((state) => {
      // Clean up object URLs
      state.images.forEach((img) => {
        URL.revokeObjectURL(img.preview);
      });
      
      return { images: [] };
    });
  },
  
  toggleSelectImage: (id) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      ),
    }));
  },
  
  selectAllImages: () => {
    set((state) => ({
      images: state.images.map((img) => ({ ...img, selected: true })),
    }));
  },
  
  deselectAllImages: () => {
    set((state) => ({
      images: state.images.map((img) => ({ ...img, selected: false })),
    }));
  },
}));
