import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  try {
    // Read the source image
    const sourceImage = path.join(__dirname, 'public', 'mr$1 testimonials', 'trade cation poster.jpg');
    const outputPath = path.join(__dirname, 'public', 'favicon.png');
    
    // Load and resize the image to 256x256 for favicon
    const image = await Jimp.read(sourceImage);
    image.resize({ w: 256, h: 256 });
    
    // Save as PNG (browsers support PNG as favicon)
    await image.toFile(outputPath);
    
    console.log('Favicon created successfully at:', outputPath);
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
