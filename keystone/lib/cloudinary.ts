import { accessEnv } from "./accessEnv";

const cloudinaryFolder = accessEnv(<string>"CLOUDINARY_FOLDER", `saint-salo`);

export const cloudinary = {
  cloudName: accessEnv(<string>"CLOUDINARY_CLOUD_NAME", "cloudinary name"),
  apiKey: accessEnv(<string>"CLOUDINARY_KEY", "cloudinary key"),
  apiSecret: accessEnv(<string>"CLOUDINARY_SECRET", "cloudinary secret"),
  folder: `${cloudinaryFolder}`,
};