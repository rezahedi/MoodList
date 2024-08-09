"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

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
  const [error, setError] = useState<string>('')
  const router = useRouter()
 
  useEffect(() => {
    setLoading(true)

    fetch("https://api.spotify.com/v1/me", {
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
      if ( !json.display_name )
        return setError("Something didn't work!!")

      setProfile({
        name: json.display_name,
        href: json.external_urls.spotify,
        id: json.id,
        image: json.images[1].url,
        followers: json.followers.total,
      });
    }).catch(err => {
      router.push('/?msg=sessiontimeout')
    })
  }, [token])

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-600'>{error}</p>}
      {!error && !loading && profile &&
        <div className="flex gap-2">
          <a href={profile.href} target="_blank" className="flex items-center justify-center gap-2">
            <b>{profile.name}</b>
            <Image
              src={profile.image} alt={profile.name}
              width={40} height={40}
              className="rounded-full"
            />
          </a>
          <button className='rounded-md bg-green-700 text-white px-4 py-2 transition-all duration-100 hover:scale-105' onClick={()=>router.push('/?msg=logout')}>Logout</button>
        </div>
      }
    </>
  )
}
