
export default function MoodMeter() {

  // TODO: Use below resource for moody playlist
  // https://developer.spotify.com/documentation/web-api/reference/get-audio-features

  return (
    <div className='flex flex-col gap-4 items-center'>
      Level of Energy:
      <input name="energy" id="energy" type="range" min="0" max="100" value="50" className="slider" /> 
      Level of Pleasantness:
      <input name="pleasantness" id="pleasantness" type="range" min="0" max="100" value="50" className="slider" />
      <button className='rounded-md bg-orange-700 px-4 py-2'>Generate</button>
    </div>
  )
}
