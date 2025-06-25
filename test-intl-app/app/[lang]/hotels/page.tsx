import Link from 'next/link';

export default function HotelsPage({ params }: { params: { lang: string } }) {
  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>
      <h1>Hotels Page ({params.lang})</h1>
      <p>This is a placeholder for your hotels listing.</p>
      <Link href={`/${params.lang}`}>Back to Home</Link>
    </div>
  );
} 