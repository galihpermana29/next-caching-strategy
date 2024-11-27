import fs from 'fs';
import path from 'path';

export function CheckCacheStatus(endpoint: string) {
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

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FKuching';
  const currentCache = CheckCacheStatus(endpoint);

  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FKuching',
    {
      next: {
        tags: ['worldtime-cache-revalidate'],
        revalidate: 10,
      },
    }
  );

  if (res.ok) {
    const data = await res.json();
    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');

    return {
      dateTime: data.dateTime,
      cache: encodedData === currentCache ? 'HIT' : 'MISS',
    };
  }

  return null;
}

export default async function CacheRevalidate() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Cache reavalidate 10s: {data.dateTime}. CACHE: {data.cache}
    </div>
  );
}
