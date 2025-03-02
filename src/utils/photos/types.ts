
/**
 * Photo Gallery Types
 * 
 * This file defines the common types used across all photo galleries.
 */

export interface GalleryCategory {
  title: string;
  path: string;
  image: string; // Preview image
  photos: string[]; // All photos in this category
}

/**
 * Utility to fix image paths to ensure they load correctly
 * 
 * @param path The raw image path
 * @returns Properly formatted image path that works with spaces and special characters
 */
export const getFixedImagePath = (path: string) => {
  try {
    // Make sure path starts with a slash
    let cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // Remove any double slashes that aren't part of protocol
    cleanPath = cleanPath.replace(/([^:])\/+/g, '$1/');
    
    // Return the path without further encoding (which was causing issues)
    return cleanPath;
  } catch (error) {
    console.error(`Error fixing image path: ${path}`, error);
    return '';
  }
};
