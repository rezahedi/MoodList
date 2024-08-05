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
  let accessToken = "";

  if(searchParams.code) {
    // Get access token server-side
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
      }, 
      body: 
        'grant_type=authorization_code' +
        '&code=' + searchParams.code +
        '&redirect_uri=' + process.env.NEXT_PUBLIC_BASE_URL
    }).then(async (res) => {
      const json = await res.json();
      accessToken = json.access_token;
    }).catch(err => {
      console.log( 'err:', err );
      // TODO: Handle error in UI to acknowledge user about the error!
    });
    

    return (
      <main>
        <Profile token={accessToken} />
        <MoodMeter token={accessToken} />
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
