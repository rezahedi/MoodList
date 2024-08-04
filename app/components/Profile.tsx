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
  const [loading, setLoading] = useState<boolean>(true)
 
  // TODO: Fetch profile details using Spotify API call locally
  
  // Spotify API endpoint for profile
  const url = "https://api.spotify.com/v1/me"


  useEffect(() => {
    setLoading(true)

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
  
    }).then(async (res) => {
      const json = await res.json()
      setLoading(false)

      setProfile({
        name: json.display_name,
        href: json.href,
        id: json.id,
        image: json.images[1].url,
        followers: json.followers.total,
      });
    })
  }, [token])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && profile &&
        <>
          <p>{profile.name}</p>
          <Image src={profile.image} alt={profile.name} width={100} height={100} />
        </>
      }
      {process.env.SPOTIFY_CLIENT_ID}
    </div>
  )
}
