import CodeHighlighter from '@/components/CodeHighlighter';
import { CheckCacheStatus } from '@/server/revalidate';
import { headers } from 'next/headers';

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FBamako';
  const currentCache = await CheckCacheStatus(endpoint);

  const header = headers();
  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FBamako',
    {
      next: {
        tags: ['worldtime-cache-revalidate-header'],
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

const code = `
async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FBamako';
  const currentCache = await CheckCacheStatus(endpoint);

  const header = headers(); // we use header and this do opt out caching
  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FBamako',
    {
      next: {
        tags: ['worldtime-cache-revalidate-header'], // we add tag
        revalidate: 10, // we add revalidate
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
      Cache revalidate with header 10s: {data.dateTime}, CACHE: {data.cache}

      <div className="my-[15px]">
        <CodeHighlighter code={code} />
      </div>
    </div>
  );
}

`;

export default async function CacheRevalidate() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Cache revalidate with header 10s: {data.dateTime}, CACHE: {data.cache}
      <div className="my-[15px]">
        <CodeHighlighter code={code} />
      </div>
    </div>
  );
}
