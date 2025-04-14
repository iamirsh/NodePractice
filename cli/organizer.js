const fs = require('fs-extra');
const path = require('path');

// Simple categories
const categories = {
  images: ['jpg', 'png', 'gif'],
  documents: ['pdf', 'docx', 'txt'],
  audio: ['mp3', 'wav'],
  videos: ['mp4', 'mov'],
  others: []
};

async function organizeFiles(directory = '.') {
  try {
    console.log(`Organizing files in ${directory}...`);
    
    // Read all files in directory
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      
      // Skip directories
      if (stats.isDirectory()) continue;
      
      // Get file extension
      const ext = path.extname(file).toLowerCase().slice(1);
      
      // Find the right category
      let category = 'others';
      for (const [cat, exts] of Object.entries(categories)) {
        if (exts.includes(ext)) {
          category = cat;
          break;
        }
      }
      
      // Create category folder if it doesn't exist
      const categoryDir = path.join(directory, category);
      await fs.ensureDir(categoryDir);
      
      // Move file to category folder
      await fs.move(
        filePath,
        path.join(categoryDir, file)
      );
      
      console.log(`Moved ${file} to ${category}/`);
    }
    
    console.log('Done organizing files!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Get directory from command line or use current directory
const directory = process.argv[2] || '.';
organizeFiles(directory);