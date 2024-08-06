import React from 'react'
import Image from 'next/image'

export default function PlayList({
  tracks
}: {
  tracks: Track[]
}) {
  const savePlaylist = () => {
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