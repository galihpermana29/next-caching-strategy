import RevalidateButton from '@/components/CacheTagButton';
import CodeHighlighter from '@/components/CodeHighlighter';
import { CheckCacheStatus } from '@/server/revalidate';
import { Tag } from 'antd';

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FKuching';
  const currentCache = await CheckCacheStatus(endpoint);

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

const code = `

async function getWorldTime() {
  const endpoint =
    'https://timeapi.io/api/time/current/zone?timeZone=Asia%2FKuching';
  const currentCache = await CheckCacheStatus(endpoint);

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

`;

export default async function CacheRevalidate() {
  const data = await getWorldTime();
  if (!data) {
    return <div>loading...</div>;
  }
  return (
    <div className="text-center">
      <h1 className="text-[22px] my-[20px]">Cache revalidate-time every 10s</h1>
      <div>
        <h1>DATA: {data.dateTime}</h1>
        {/* <h2>
          CACHE-STATUS:{' '}
          <Tag
            color={data.cache === 'HIT' ? 'green' : 'red'}
            className="text-[22px]">
            {data.cache}
          </Tag>
        </h2> */}
      </div>
      <div className="my-[20px]">
        <RevalidateButton tagName="worldtime-cache-revalidate" />
      </div>
      <div className="my-[15px] text-start">
        <CodeHighlighter code={code} />
      </div>
    </div>
    // <div>
    //   Cache reavalidate 10s: {data.dateTime}. CACHE: {data.cache}
    //   <div className="my-[15px]">
    //     <CodeHighlighter code={code} />
    //   </div>
    // </div>
  );
}
