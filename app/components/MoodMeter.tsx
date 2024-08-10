"use client"

import { useEffect, useState } from 'react'
import PlayList, { Track } from './PlayList'
import { useRouter } from "next/navigation"
import MoodRange from './MoodRange'
import TrackSkeleton from './TrackSkeleton'

// Got available genre seeds from here:
// https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
const allGenres = ["acoustic", "afrobeat", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "brazil", "british", "children", "chill", "classical", "club", "comedy", "country", "dance", "deep-house", "disco", "disney", "electronic", "folk", "french", "funk", "german", "guitar", "happy", "hard-rock", "hardcore", "heavy-metal", "hip-hop", "holidays", "house", "indian", "iranian", "jazz", "k-pop", "kids", "latin", "latino", "metal", "movies", "new-age", "opera", "party", "piano", "pop", "punk", "punk-rock", "rainy-day", "road-trip", "rock", "rock-n-roll", "romance", "sad", "salsa", "samba", "sleep", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "tango", "techno", "trance", "turkish", "work-out", "world-music"]

export default function MoodMeter({
  token
}: {
  token: string
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('')
  const [playList, setPlayList] = useState<Track[]>([]);
  const [energy, setEnergy] = useState<number>(0.6)
  const [valence, setValence] = useState<number>(0.5)
  const [playlistTitle, setPlaylistTitle] = useState<string>('')
  const [genres, setGenres] = useState<string[]>(['soundtracks', 'movies', 'french'])
  const genresMaxLimit = 5;
  const genresMinLimit = 1;
  const router = useRouter()

  const generatePlayList = () => {
    setLoading(true)

    // Get Recommendations API docs:
    // https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    
    const params = new URLSearchParams()
    params.set('limit', '10')
    params.set('seed_genres', genres.join(','))
    params.set('target_energy', `${energy}`)
    params.set('target_valence', `${valence}`)

    fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(async (res) => {
      const json = await res.json()
      setLoading(false)

      if ( res.status===401 )
        router.push('/?msg=sessiontimeout')
      if ( res.status!==200 )
        return setError("Request or access error!")

      console.log(json.tracks)
      let tracks : Track[] = []
      json.tracks.map(track => {
        tracks.push({
          id: track.id,
          uri: track.uri,
          url: track.external_urls.spotify,
          name: track.name,
          artists: [

          ],
          album: {
            name: track.album.name,
            url: track.album.external_urls.spotify,
            image: track.album.images[0].url
          }
        })
      });
      setPlayList(tracks)

    }).catch(err => {
      router.push('/?msg=sessiontimeout')
    })
  }

  const addGenre = (genre: string) => {
    if( genres.length >= genresMaxLimit )
      return setGenres( [...genres.slice(1), genre] )
    
    setGenres([ ...genres, genre])
  }

  const removeGenre = (genre: string) => {
    if( genres.length == genresMinLimit )
      return

    let myArray = genres.filter(a => a!=genre)
    setGenres(myArray)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if( e.currentTarget.checked )
      addGenre( e.currentTarget.value )
    else
      removeGenre( e.currentTarget.value )
  }

  return (
    <>
      <MoodRange setEnergy={setEnergy} setValence={setValence} setPlaylistName={setPlaylistTitle} />

      <div>
        <h2 className='font-bold text-2xl text-center'>Genres</h2>
        <p className='text-center text-sm'>Select between one to five genres for your playlist</p> 
      </div>
      <div className='flex flex-wrap gap-1 justify-center'>
        {allGenres.map((genre, i) => (
          <label key={i} className='px-2 py-1 rounded-md border border-transparent capitalize has-[:checked]:border-green-600 has-[:checked]:bg-green-700 dark:has-[:checked]:bg-green-950 cursor-pointer hover:border-gray-600'>
            <input
              type='checkbox' className='hidden'
              name='genres' value={genre}
              checked={genres.find(g=>g==genre)?true:false}
              onChange={handleCheckboxChange}
            />
              {genre}
          </label>
        ))}
      </div>
      <button className='rounded-md text-white bg-green-700 px-4 py-2 transition-all duration-100 hover:scale-105' onClick={generatePlayList}>Generate</button>
      {loading && 
        <div className='flex flex-col gap-1 justify-center'>
          {Array.from({length:10}).map((_, i) => (<TrackSkeleton key={i} />))}
        </div>
      }
      {error && <p className='text-red-600'>{error}</p>}
      {!loading && !error && playList.length>0 && <PlayList name={playlistTitle} tracks={playList} token={token} />}
    </>
  )
}
