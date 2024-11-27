import { headers } from 'next/headers';
import { CheckCacheStatus } from '../cache-revalidate/page';

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FAbidjan';
  const currentCache = CheckCacheStatus(endpoint);

  const header = headers();
  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Africa%2FAbidjan',
    {
      next: {
        tags: ['worldtime-tag-header'],
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

export default async function CacheTagHeader() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Cache tag header: {data.dateTime}, CACHE: {data.cache}
    </div>
  );
}
