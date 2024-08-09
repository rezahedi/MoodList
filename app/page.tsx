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
      <div className="flex flex-col">
        <header className="w-full sticky top-0 dark:bg-black/50 bg-white/50 backdrop-blur-sm p-4">
          <div className="flex container mx-auto max-w-screen-xl">
            <h1 className="text-4xl font-bold flex-grow">Mood List</h1>
            <Profile token={accessToken} />
          </div>
        </header>
        <main className="flex flex-col gap-4 items-center container mx-auto max-w-screen-xl pt-4">
          <MoodMeter token={accessToken} />
        </main>
        <footer className="text-sm border-t border-gray-400 py-4 mt-10 text-gray-400 container mx-auto max-w-screen-md text-center">
          Mood List powered by <a href="https://developer.spotify.com/documentation/web-api/reference/get-recommendations" target="_blank">Spotify API</a>, <a href="https://nextjs.org/" target="_blank">Next.js</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>.
          Source code available on <a href="https://github.com/rezahedi/moodlist" target="_blank">GitHub</a>.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-fit">
      <main className="p-4 flex flex-col gap-4 items-center container mx-auto max-w-screen-md flex-1 h-full min-h-fit">
        <h1 className="text-4xl font-bold mb-4">Mood List</h1>
        <Image src="/lifewire.com.jpg" alt="Mood Meter Photo - copyright: Lifewire.com" width={500} height={400} className="rounded-md" />
        <p>This application uses Spotify's API to generate a playlist based on your mood and your genre selection, and then gave you the ability to play or save it as a private playlist in your Spotify account. So to do this, Mood List need the necessary permissions on your Spotify's account.</p>  
        <Link
          href={`https://accounts.spotify.com/authorize?response_type=code&scope=${scope}&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}`}
          className="rounded-md bg-green-700 no-underline text-white hover:text-white transition-all duration-100 hover:scale-105 px-4 py-2 text-xl" 
        >
          Connect with Spotify
        </Link>
        {searchParams.msg && searchParams.msg=='sessiontimeout' && <p className='text-red-600'>Your session has expired. Please try again.</p>}
      </main>
      <footer className="text-sm border-t border-gray-400 py-4 mt-10 text-gray-400 container mx-auto max-w-screen-md text-center">
        Mood List powered by <a href="https://developer.spotify.com/documentation/web-api/reference/get-recommendations" target="_blank">Spotify API</a>, <a href="https://nextjs.org/" target="_blank">Next.js</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>.
        Source code available on <a href="https://github.com/rezahedi/moodlist" target="_blank">GitHub</a>.
      </footer>
    </div>
  );
}
