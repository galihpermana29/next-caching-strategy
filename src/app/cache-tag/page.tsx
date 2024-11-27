import RevalidateButton from '@/components/CacheTagButton';
import CodeHighlighter from '@/components/CodeHighlighter';
import { CheckCacheStatus } from '@/server/revalidate';

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam';
  const currentCache = await CheckCacheStatus(endpoint);

  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam',
    {
      next: {
        tags: ['worldtime-tag'],
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
    'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam';
  const currentCache = await CheckCacheStatus(endpoint);

  const res = await fetch(
    'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FAmsterdam',
    {
      next: {
        tags: ['worldtime-tag'],
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

export default async function Home() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div>
      Cache tag: {data.dateTime}, CACHE: {data.cache}
      <div>
        <RevalidateButton tagName="worldtime-tag" />
      </div>
    </div>
  );
}

  `;

export default async function Home() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      Cache tag: {data.dateTime}, CACHE: {data.cache}
      <div>
        <RevalidateButton tagName="worldtime-tag" />
      </div>
      <div className="my-[15px]">
        <CodeHighlighter code={code} />
      </div>
    </div>
  );
}
