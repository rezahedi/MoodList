import Link from "next/link";
import MoodMeter from "./components/MoodMeter";
import Profile from "./components/Profile";

export default async function Home(
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
    console.log( 'searchParams.code:', searchParams.code );
    
    // Get access token server-side
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic OTU5Yjg2ZGE5YjgzNDJjYTg5MDkzYTFjYzQ3Mjc3ODU6NTFhMzhkMTdjMWMyNDdlYmJjNWNjYTJhZjdiNGU3OGU='
      }, 
      body: 
        'grant_type=authorization_code' +
        '&code=' + searchParams.code +
        '&redirect_uri=' + process.env.NEXT_PUBLIC_BASE_URL
    }).then(async (res) => {
      console.log( 'res:', await res.json() );
    }).catch(err => {
      console.log( 'err:', err );
    });
    

    return (
      <main>
        <p>Connected!</p>
        <Profile token={searchParams.code} />

        <MoodMeter />
      </main>
    );
  }

  return (
    <main>
      <Link href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`}>
        Connect to Spotify
      </Link>
    </main>
  );
}
