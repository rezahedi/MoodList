import Link from "next/link";

export default function Home(
  {
    searchParams
  }: {
    searchParams: {
      code: string;
    }
  }
) {
  const scope = 'user-read-private user-read-email';

  if(searchParams.code) {
    return (
      <main>
        <p>Connected!</p>
        access token code: {searchParams.code}
      </main>
    );
  }

  return (
    <main>
      <Link href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`}>
        Connect to Spotify
      </Link>
    </main>
  );
}
