"use client"

import { useEffect, useState } from 'react'
import PlayList, { Track } from './PlayList'
import { useRouter } from "next/navigation"
import MoodRange from './MoodRange'

// Got available genre seeds from here:
// https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
const allGenres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"]

export default function MoodMeter({
  token
}: {
  token: string
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('')
  const [playList, setPlayList] = useState<Track[]>([]);
  const [energy, setEnergy] = useState<number>(0.5)
  const [valence, setValence] = useState<number>(0.5)
  const [genres, setGenres] = useState<string[]>(['french', 'spanish', 'iranian', 'indian', 'pop'])
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
      return alert(`Genres selection limit exceeded (max ${genresMaxLimit}).`)
    
    setGenres([ ...genres, genre])
  }

  const removeGenre = (genre: string) => {
    if( genres.length == genresMinLimit )
      return alert(`Genres selection minimum limit is ${genresMaxLimit} genre.`)

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
    <div className='flex flex-col gap-4 items-center'>
      <MoodRange />
      Level of Energy:
      <input
        name="energy" id="energy" type="range" className="slider"
        min="0" max="100" defaultValue={energy*100}
        onChange={e=>setEnergy( parseInt(e.currentTarget.value) / 100 )}
      />
      Level of Pleasantness:
      <input
        name="pleasantness" id="pleasantness" type="range" className="slider"
        min="0" max="100" defaultValue={valence*100}
        onChange={e=>setValence( parseInt(e.currentTarget.value) / 100 )}
      />
      Select Genres:
      <div className='flex flex-wrap gap-1 justify-center'>
        {allGenres.map((genre, i) => (
          <label key={i} className='px-2 py-1 rounded-md border border-transparent capitalize has-[:checked]:border-white has-[:checked]:bg-gray-800 cursor-pointer hover:border-gray-600'>
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
      <button className='rounded-md bg-orange-700 px-4 py-2' onClick={generatePlayList}>Generate</button>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-600'>{error}</p>}
      {!loading && !error && playList.length>0 && <PlayList tracks={playList} token={token} />}
    </div>
  )
}
