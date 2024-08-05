import React from 'react'
import Image from 'next/image'

export default function PlayList({
  tracks
}: {
  tracks: Track[]
}) {
  return (
    <div className='space-y-2'>
      PlayList:
      {tracks && tracks.map(track => 
        <div
          key={track.id}
          className='border rounded-md p-4 flex gap-2 items-center'
        >
          <Image
            src={track.album.image} alt={track.album.name}
            width={100} height={100}
            className=''
          />
          <div className='flex flex-col'>
            <a href={track.url}><b>{track.name}</b></a>
            <a href="#">Artist Name</a>
            <a href={track.album.url}>{track.album.name}</a>
          </div>
        </div>
      )}
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