import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <h1>Cache:</h1>
      <ul>
        <li className="text-blue-600">
          <Link href="/cache-tag">Cache tag</Link>
        </li>
        <li className="text-blue-600">
          <Link href="/cache-tag-header">Cache tag w/header</Link>
        </li>
        <li className="text-blue-600">
          <Link href="/cache-revalidate-header">Cache revalidate w/header</Link>
        </li>
        <li className="text-blue-600">
          <Link href="/cache-revalidate">Cache revalidate 10s</Link>
        </li>
      </ul>
    </div>
  );
}
