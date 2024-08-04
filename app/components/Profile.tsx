"use client"

export default function Profile({
  token
}: {
  token: string
}) {
  
  // TODO: Fetch profile details using Spotify API call locally
  
  // Spotify API endpoint for profile
  const url = "https://api.spotify.com/v1/me"

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }

  }).then(async (res) => {
    console.log( 'profile:', await res.json() );
  })

  return (
    <div>
      {token}
      <p>Profile image and name</p>
      {process.env.SPOTIFY_CLIENT_ID}
    </div>
  )
}
