import Link from 'next/link';

export default function LangHomePage({ params }: { params: { lang: string } }) {
  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: 100 }}>
      <h1>Welcome! Language: {params.lang}</h1>
      <nav style={{ margin: '20px 0' }}>
        <Link href={`/${params.lang}/hotels`} style={{ marginRight: 20, color: '#61dafb' }}>Hotels</Link>
        <Link href={`/${params.lang}/restaurants`} style={{ color: '#61dafb' }}>Restaurants</Link>
      </nav>
      <div style={{ margin: '40px 0' }}>
        <Link href={params.lang === 'en' ? '/es' : '/en'} style={{ color: '#ffb347' }}>
          Switch to {params.lang === 'en' ? 'Spanish' : 'English'}
        </Link>
      </div>
      <p>This is your new home page. Add your real content here!</p>
    </div>
  );
} 