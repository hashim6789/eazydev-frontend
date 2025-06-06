export const config = {
  API_BASE_URL:
    // import.meta.env.VITE_API_BASE_URL || "www.muhammedhashim.online",
    import.meta.env.VITE_API_BASE_URL || "http:localhost:3333/api",
  CLOUDINARY_API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_PRESET: import.meta.env.VITE_CLOUDINARY_PRESET,
  VITE_STRIPE_PK: import.meta.env.VITE_STRIPE_PK,
  GOOGLE_AUTH_CLIENT_ID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
};
