"use client"

export default function Profile({
  token
}: {
  token: string
}) {
  
  // TODO: Fetch profile details using Spotify API call locally

  return (
    <div>
      <p>Profile image and name</p>
      {token}
    </div>
  )
}
