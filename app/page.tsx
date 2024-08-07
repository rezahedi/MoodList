import Link from "next/link";
import MoodMeter from "./components/MoodMeter";
import Profile from "./components/Profile";
import Image from "next/image";

export default async function Home(
  {
    searchParams
  }: {
    searchParams: {
      code: string;
      msg: string;
    }
  }
) {
  const scope = 'playlist-modify-public playlist-modify-private';
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
      <main className="p-4 flex flex-col gap-4 items-center container mx-auto max-w-screen-xl">
        <Profile token={accessToken} />
        <MoodMeter token={accessToken} />
      </main>
    );
  }

  return (
    <main className="p-4 flex flex-col gap-4 items-center container mx-auto max-w-screen-xl">
      <h1 className="text-4xl font-bold">Spotify Mood Meter</h1>
      <p>This is a application that uses Spotify's API to generate a playlist based on your mood and your genre selection, and then you can play or save the playlist to your Spotify account as a private playlist.</p>
      <Image src="/mood-meter-etsy.jpg" alt="Mood Meter Photo" width={400} height={400} />
      <Link
        href={`https://accounts.spotify.com/authorize?response_type=code&scope=${scope}&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`}
        className="rounded-md bg-green-700 px-4 py-2 text-xl"
      >
        Connect to Spotify
      </Link>
      {searchParams.msg && searchParams.msg=='sessiontimeout' && <p className='text-red-600'>Your session has expired. Please try again.</p>}
    </main>
  );
}
