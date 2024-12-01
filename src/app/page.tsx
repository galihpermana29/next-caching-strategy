import Link from 'next/link';

export default async function Home() {
  return (
    <div className="text-center mt-[20px]">
      <h1 className="text-[22px] my-[20px]">Next JS Caching Strategy:</h1>
      <ul>
        <li className="text-blue-600 text-[18px]">
          <Link href="/cache-tag">Cache with tagging</Link>
        </li>
        <li className="text-blue-600 text-[18px]">
          <Link href="/cache-tag-header">Cache with tagging use header()</Link>
        </li>
        <li className="text-blue-600 text-[18px]">
          <Link href="/cache-revalidate">
            Cache with time-revalidate every 10s
          </Link>
        </li>
        <li className="text-blue-600 text-[18px]">
          <Link href="/cache-revalidate-header">
            Cache with time-revalidate use header()
          </Link>
        </li>
      </ul>
    </div>
  );
}
