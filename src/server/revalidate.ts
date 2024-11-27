'use server';

import { revalidateTag } from 'next/cache';

import fs from 'fs';
import path from 'path';

export async function revalidation(tagName: string) {
  revalidateTag(tagName);
}

export async function CheckCacheStatus(endpoint: string) {
  const cacheDir = path.join(process.cwd(), '.next/cache/fetch-cache');
  let currentCache = null;
  // Check if directory exists
  if (fs.existsSync(cacheDir)) {
    const files = fs.readdirSync(cacheDir);

    // Optionally read file contents
    files.forEach((file) => {
      const filePath = path.join(cacheDir, file);
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const jsonFile = JSON.parse(fileContents);

        if (Object.prototype.hasOwnProperty.call(jsonFile, 'data')) {
          if (jsonFile.data.url.toString() === endpoint) {
            currentCache = jsonFile.data.body;
          }
        }
      } catch (readError) {
        console.error(`Error reading ${file}:`, readError);
      }
    });
  } else {
    console.log('Fetch cache directory does not exist');
  }

  return currentCache;
}
