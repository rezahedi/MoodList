"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Profile = {
  name: string,
  href: string,
  id: string,
  image: string,
  followers: number,
}

export default function Profile({
  token
}: {
  token: string
}) {

  const [profile, setProfile] = useState<Profile | null>(null)
 
  // TODO: Fetch profile details using Spotify API call locally
  
  // Spotify API endpoint for profile
  const url = "https://api.spotify.com/v1/me"

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }

  }).then(async (res) => {
    const json = await res.json()
    setProfile({
      name: json.display_name,
      href: json.href,
      id: json.id,
      image: json.images[1].url,
      followers: json.followers.total,
    });
    console.log( 'profile:', profile );
  })

  return (
    <div>
      {profile !== null && 
        <>
          <p>{profile.name}</p>
          <Image src={profile.image} alt={profile.name} width={100} height={100} />
        </>
      }
      {process.env.SPOTIFY_CLIENT_ID}
    </div>
  )
}
