/**
 * This module sets up and exports a configured Cloudinary instance.
 * The Cloudinary SDK is initialized with credentials from environment variables.
 * This setup allows interaction with Cloudinary's API for tasks such as image and video uploads.
 *
 * @module cloudinaryConfig
 */
import { v2 as cloudinary } from 'cloudinary';

/**
 * Configures the Cloudinary SDK with credentials from environment variables.
 * The environment variables required are:
 * - `CLOUDINARY_NAME`: Your Cloudinary cloud name.
 * - `CLOUDINARY_KEY`: Your Cloudinary API key.
 * - `CLOUDINARY_SECRET`: Your Cloudinary API secret.
 *
 * Example usage:
 * ```javascript
 * import cloudinary from './path/to/your/cloudinary/config';
 * 
 * // Upload an image
 * cloudinary.uploader.upload('path/to/your/image.jpg', (error, result) => {
 *     if (error) {
 *         console.error('Upload failed:', error);
 *     } else {
 *         console.log('Upload successful:', result);
 *     }
 * });
 * ```
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;