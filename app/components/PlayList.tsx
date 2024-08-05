import React from 'react'

export default function PlayList({
  tracks
}: {
  tracks: Track[]
}) {
  return (
    <div className='space-y-2'>
      PlayList:
      {tracks && tracks.map(track => 
        <div key={track.id} className='border rounded-md p-4'>
          {track.name}
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