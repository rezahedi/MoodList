"use client"

export default function Profile({
  token
}: {
  token: string
}) {
  return (
    <div>
      <p>Profile image and name</p>
      {token}
    </div>
  )
}
