import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Spotify } from 'react-spotify-embed'

export default function PlayList({
  tracks,
  token
}: {
  tracks: Track[]
  token: string
}) {

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [resultURL, setResultURL] = useState<string>('')
  const router = useRouter()

  // FIXME: Temporary value to test!
  let username = '12120680111'

  const savePlaylist = () => {
    setLoading(true)

    // TODO: Creating a playlist
    // https://developer.spotify.com/documentation/web-api/reference/create-playlist

    fetch(`https://api.spotify.com/v1/users/${username}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Playlist name',
        description: 'Playlist description',
        public: false
      })
    }).then(async (res) => {
      const json = await res.json()
      setLoading(false)

      console.log('playlist save:', json)

      if ( res.status===401 )
        router.push('/')
      if ( res.status!==200 )
        return setError("Request or access error!")

      setResultURL(json.external_urls.spotify)

    }).catch(err => {
      router.push('/')
    })
    console.log('save clicked!')
  }

  return (
    <div className='space-y-2'>
      {tracks &&
      <>
        PlayList:
        {tracks.map(track => 
          <div
            key={track.id}
            className='border rounded-md p-4 flex gap-2 items-center'
          >
            <Image
              src={track.album.image} alt={track.album.name}
              width={100} height={100}
            />
            <div className='flex flex-col'>
              <a href={track.url} target='_blank'><b>{track.name}</b></a>
              <a href="#" target='_blank'>Artist Name</a>
              <a href={track.album.url} target='_blank'>{track.album.name}</a>
            </div>
          </div>
        )}
        <p>Do you want to save these as a playlist in your Spotify account?</p>
        <button className='rounded-md bg-orange-700 px-4 py-2' onClick={savePlaylist}>Yes, Save it!</button>
        {loading && <p>Saving...</p>}
        {error && <p className='text-red-600'>{error}</p>}
        {!loading && !error && resultURL && <a href={resultURL} target='_blank'>Open Playlist</a>}
        <Spotify className='sticky bottom-0 w-full' wide link={tracks[0].url} />
      </>}
    </div>
  )
}

export type Track = {
  id: string,
  url: string,
  name: string,
  artists: {
    url: string,
    name: string,
  }[],
  album: {
    name: string,
    url: string,
    image: string,
  }
}