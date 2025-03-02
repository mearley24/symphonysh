
/**
 * Photo Gallery Utilities
 * 
 * This file centralizes all photo gallery data to make it easier to add, remove,
 * or update photos across the application.
 */

export interface GalleryCategory {
  title: string;
  path: string;
  image: string; // Preview image
  photos: string[]; // All photos in this category
}

// Home Theater Gallery
export const homeTheaterPhotos = [
  "/lovable-uploads/home theater/IMG_0509.JPG",
  "/lovable-uploads/home theater/IMG_0512.JPG",
  "/lovable-uploads/home theater/IMG_0920.JPG",
  "/lovable-uploads/home theater/IMG_0921.JPG",
  "/lovable-uploads/home theater/IMG_0925.JPG",
  "/lovable-uploads/home theater/IMG_0926.JPG",
  "/lovable-uploads/home theater/IMG_0958.JPG",
  "/lovable-uploads/home theater/IMG_0979.JPG",
  "/lovable-uploads/home theater/IMG_0980.JPG",
  "/lovable-uploads/home theater/IMG_0981.JPG",
  "/lovable-uploads/home theater/IMG_0982.JPG"
];

// Mounted TVs Categories
export const mountedTVsCategories: GalleryCategory[] = [
  { 
    title: "BC Condo Fireplace", 
    path: "/photos/mounted-tvs/bc-condo-fp", 
    image: "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0610.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/BC Condo FP/70551934893__F08E6641-B90D-4FE9-96CB-B6043C9EFBB7.jpg",
      "/lovable-uploads/mounted tvs/BC Condo FP/70682259838__CA09AB38-91D5-434E-9D12-D8D3BEC77650.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/70682261617__B029C99B-C48B-4344-B91B-06B9B4921F7C.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0610.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0677.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0678.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0679.JPG"
    ]
  },
  { 
    title: "Backbox Fireplace", 
    path: "/photos/mounted-tvs/backbox-fp", 
    image: "/lovable-uploads/mounted tvs/Backbox FP/IMG_0024.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0024.JPG",
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0025.JPG",
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0026.JPG",
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0027.JPG",
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0028.JPG",
      "/lovable-uploads/mounted tvs/Backbox FP/IMG_0029.JPG"
    ]
  },
  { 
    title: "Fireplace Frame", 
    path: "/photos/mounted-tvs/fp-frame", 
    image: "/lovable-uploads/mounted tvs/FP Frame/IMG_2189.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/FP Frame/IMG_2189.JPG",
      "/lovable-uploads/mounted tvs/FP Frame/IMG_2190.JPG",
      "/lovable-uploads/mounted tvs/FP Frame/IMG_2191.JPG"
    ]
  },
  { 
    title: "Frame & Sonos", 
    path: "/photos/mounted-tvs/frame-sonos", 
    image: "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0022.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0022.JPG",
      "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0023.JPG",
      "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0030.JPG"
    ]
  },
  { 
    title: "HP Installations", 
    path: "/photos/mounted-tvs/hp", 
    image: "/lovable-uploads/mounted tvs/HP/IMG_0179.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/HP/IMG_0179.JPG",
      "/lovable-uploads/mounted tvs/HP/IMG_0180.JPG",
      "/lovable-uploads/mounted tvs/HP/IMG_0181.JPG",
      "/lovable-uploads/mounted tvs/HP/IMG_0182.JPG",
      "/lovable-uploads/mounted tvs/HP/IMG_0959.JPG",
      "/lovable-uploads/mounted tvs/HP/IMG_0993.JPG"
    ]
  },
  { 
    title: "Home Installations", 
    path: "/photos/mounted-tvs/home", 
    image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Home/71355776563__D3C0B111-3E4E-4B32-A4BB-7B60F151C39A.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0660.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0661.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0662.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0663.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0664.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0665.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0666.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0668.JPG",
      "/lovable-uploads/mounted tvs/Home/IMG_0669.JPG"
    ]
  },
  { 
    title: "Mantel Mount", 
    path: "/photos/mounted-tvs/mantel-mount", 
    image: "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1090.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Mantel Mount/70311390744__4AD111C8-188E-494E-84A7-03CB45F8EB0E.JPG",
      "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1090.JPG",
      "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1091.JPG",
      "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1092.JPG",
      "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1093.JPG",
      "/lovable-uploads/mounted tvs/Mantel Mount/IMG_1519.JPG"
    ]
  },
  { 
    title: "Misc Installations", 
    path: "/photos/mounted-tvs/misc", 
    image: "/lovable-uploads/mounted tvs/Misc/IMG_0224.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Misc/67813535017__75719363-184F-4A66-B09E-31472EF7FF49.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0224.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0225.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0226.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0227.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0228.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0229.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0247.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0248.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0287.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0337.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0875.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0876.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0877.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0977.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_0978.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1083.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1346.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1347.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1348.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1549.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1550.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1713.JPG",
      "/lovable-uploads/mounted tvs/Misc/IMG_1714.JPG"
    ]
  },
  { 
    title: "Singletree Fireplace", 
    path: "/photos/mounted-tvs/singletree-fp", 
    image: "/lovable-uploads/mounted tvs/Singletree FP/IMG_1185.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Singletree FP/71933685675__F16DF3ED-FB5F-4C31-9CC8-BD0646AB5261.JPG",
      "/lovable-uploads/mounted tvs/Singletree FP/71934395331__485C1403-1DFC-4709-B065-646D9517109C.JPG",
      "/lovable-uploads/mounted tvs/Singletree FP/71934400537__62DC73D0-4A52-4166-8D67-EA8E25C0E2EB.JPG",
      "/lovable-uploads/mounted tvs/Singletree FP/IMG_1185.JPG"
    ]
  },
  { 
    title: "West Vail Backbox", 
    path: "/photos/mounted-tvs/west-vail-bb", 
    image: "/lovable-uploads/mounted tvs/West Vail BB/IMG_1717.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/West Vail BB/IMG_1717.JPG",
      "/lovable-uploads/mounted tvs/West Vail BB/IMG_1718.JPG"
    ]
  },
  { 
    title: "Wood Media", 
    path: "/photos/mounted-tvs/wood-media", 
    image: "/lovable-uploads/mounted tvs/Wood Media/IMG_0510.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/Wood Media/IMG_0340.JPG",
      "/lovable-uploads/mounted tvs/Wood Media/IMG_0510.JPG",
      "/lovable-uploads/mounted tvs/Wood Media/IMG_0511.JPG"
    ]
  }
];

// Wiring Gallery
export const wiringPhotos = {
  general: [
    "/lovable-uploads/wiring/71674303475__8894E961-8D43-47AC-906F-6F5262138D13.JPG",
    "/lovable-uploads/wiring/71674305301__BF3FF410-BB0F-4285-B21C-A7F9EDEBA8B3.JPG",
    "/lovable-uploads/wiring/71934397485__8C49F301-AD94-46A1-86EB-A779999B757F.JPG",
    "/lovable-uploads/wiring/IMG_0080.JPG",
    "/lovable-uploads/wiring/IMG_0136.JPG",
    "/lovable-uploads/wiring/IMG_0137.JPG",
    "/lovable-uploads/wiring/IMG_0228 2.JPG",
    "/lovable-uploads/wiring/IMG_0578.JPG",
    "/lovable-uploads/wiring/IMG_1138.JPG",
    "/lovable-uploads/wiring/IMG_1139.JPG",
    "/lovable-uploads/wiring/IMG_1161.JPG",
    "/lovable-uploads/wiring/IMG_1311.JPG",
    "/lovable-uploads/wiring/IMG_1312.JPG",
    "/lovable-uploads/wiring/IMG_1313.JPG",
    "/lovable-uploads/wiring/IMG_1320.JPG",
    "/lovable-uploads/wiring/IMG_1321.JPG",
    "/lovable-uploads/wiring/IMG_1322.JPG",
    "/lovable-uploads/wiring/IMG_1323.JPG",
    "/lovable-uploads/wiring/IMG_1324.JPG",
    "/lovable-uploads/wiring/IMG_1499.JPG",
    "/lovable-uploads/wiring/IMG_1755.JPG"
  ],
  relocation: [
    "/lovable-uploads/wiring/IMG_0611.JPG",
    "/lovable-uploads/wiring/IMG_1551.JPG",
    "/lovable-uploads/wiring/IMG_1552.JPG",
    "/lovable-uploads/wiring/IMG_1733.JPG"
  ]
};

// Helper Functions

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

/**
 * Add new photos to an existing gallery
 * 
 * @param galleryKey The key of the gallery to update
 * @param newPhotos Array of new photo paths to add
 */
export const addPhotosToGallery = (
  galleryType: 'homeTheater' | 'mountedTVs' | 'wiring',
  categoryTitle: string | null, // Only needed for mountedTVs
  newPhotos: string[]
) => {
  // This is just a helper function documentation - actual implementation 
  // would depend on how you want to store and update this data
  console.log(`To add new photos to ${galleryType} gallery, category: ${categoryTitle || 'N/A'}, add these paths:`);
  console.log(newPhotos.join('\n'));
  console.log('\nThen update the photoUtils.ts file with these new paths.');
};

/**
 * Instructions for adding new photos to galleries
 * 
 * 1. Upload new photos to the corresponding folder in public/lovable-uploads/
 * 2. Add the new photo paths to the appropriate array in this file
 * 3. The changes will automatically be reflected in the galleries
 */
