import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Spotify } from 'react-spotify-embed'

export default function PlayList({
  name,
  tracks,
  token
}: {
  name: string,
  tracks: Track[]
  token: string
}) {

  const [playerTrack, setPlayerTrack] = useState<string>( tracks[0].url )
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
        name,
        description: 'Playlist created by MoodList application!',
        public: false
      })
    }).then(async (res) => {
      const createdPlaylist = await res.json()

      if ( res.status===401 )
        router.push('/?msg=sessiontimeout')
      if ( res.status!==201 ) {
        setLoading(false)
        return setError("Request or access error!")
      }

      // TODO: Add tracks to the created playlist
      // https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist

      let uris = tracks.map(track => track.uri);
      await fetch(`https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: uris
        })
      }).then(async (res) => {
        const json = await res.json()
        setLoading(false)
  
        if ( res.status===401 )
          router.push('/?msg=sessiontimeout')
        if ( res.status!==201 )
          return setError("Couldn't add tracks to playlist, Request or access error!")
      })

      setResultURL(createdPlaylist.external_urls.spotify)

    }).catch(err => {
      router.push('/?msg=sessiontimeout')
    })
  }

  return (
    <>
      {tracks &&
      <>
        <h2 className='font-bold text-2xl text-center'>Generated Playlist</h2>
        <div className='space-y-2'>
          {tracks.map(track => 
            <div
              key={track.id}
              className='border rounded-md border-gray-400 p-4 flex gap-2 items-center'
            >
              <Image
                src={track.album.image} alt={track.album.name}
                width={100} height={100}
              />
              <div className='flex flex-col flex-grow'>
                <b>{track.name}</b>
                <span>Artist Name</span>
                <span>{track.album.name}</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span>Open on:</span>
                <a className='rounded-md text-white hover:text-white no-underline bg-green-700 px-3 py-1 transition-all duration-100 hover:scale-105' href={track.url} target='_blank'>Spotify</a>
                <button className='rounded-md text-white bg-green-700 px-3 py-1 transition-all duration-100 hover:scale-105' onClick={() => setPlayerTrack(track.url)}>Player</button>
              </div>
            </div>
          )}
        </div>
        <p>Do you want to save these as a playlist in your Spotify account?</p>
        <button className='rounded-md text-white bg-green-700 px-4 py-2 transition-all duration-100 hover:scale-105' onClick={savePlaylist}>Yes, Save it!</button>
        {loading && <p>Saving...</p>}
        {error && <p className='text-red-600'>{error}</p>}
        {!loading && !error && resultURL && <a href={resultURL} target='_blank'>Open Playlist</a>}
        <Spotify className='sticky bottom-0 w-full' wide link={playerTrack} />
      </>}
    </>
  )
}

export type Track = {
  id: string,
  uri: string,
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