import { Dispatch, SetStateAction, useState, useEffect } from 'react'

// Array set copied from https://codepen.io/pandahead33/pen/dyQveJR
const emotions = [
  "in despair", "hopeless", "desolate", "spent", "drained", "sleepy", "complacent", "tranquil", "cozy", "serene",
  "despondent", "depressed", "sullen", "exhausted", "fatigued", "mellow", "thoughtful", "peaceful", "comfy", "carefree",
  "alienated", "miserable", "lonely", "disheartened", "tired", "relaxed", "chill", "restful", "blessed", "balanced",
  "pessimistic", "morose", "discouraged", "sad", "bored", "calm", "secure", "satisfied", "grateful", "touched",
  "disgusted", "glum", "disappointed", "down", "apathetic", "at ease", "easygoing", "content", "loving", "fulfilled",
  "repulsed", "troubled", "concerned", "uneasy", "peeved", "pleasant", "joyful", "hopeful", "playful", "blissful",
  "anxious", "apprehensive", "worried", "irritated", "annoyed", "pleased", "happy", "focused", "proud", "thrilled",
  "fuming", "frightened", "angry", "nervous", "restless", "energized", "lively", "enthusiastic", "optimistic", "excited",
  "livid", "furious", "frustrated", "tense", "stunned", "hyper", "cheerful", "motivated", "inspired", "elated",
  "enraged", "panicked", "stressed", "jittery", "shocked", "surprised", "upbeat", "festive", "exhilarated", "ecstatic",
]

// Design inspired by https://www.etsy.com/listing/1340253512/mood-meter-digital-poster-printable-mood
export default function MoodRange({
  setEnergy,
  setValence,
  setPlaylistName
}: {
  setEnergy: Dispatch<SetStateAction<number>>,
  setValence: Dispatch<SetStateAction<number>>,
  setPlaylistName: Dispatch<SetStateAction<string>>,
}) {

  const [defaultMood, setDefaultMood] = useState<string>('pleased')

  const handleClick = (num: number) => {
    console.log( 'energy:', (num%10+1)/10, 'valence:', (Math.trunc(num/10)+1)/10 )
    setEnergy( (num%10+1)/10 )
    setValence( (Math.trunc(num/10)+1)/10 )
    setDefaultMood(emotions[num])
  }

  useEffect(() => {
    let capitalizedMood = defaultMood.charAt(0).toUpperCase() + defaultMood.slice(1)
    setPlaylistName(`${capitalizedMood} - MoodList`) 
  }, [defaultMood])

  return (
    <div>
      <h2 className='font-bold text-2xl text-center'>Mood Board</h2>
      <p className='text-center text-sm'>Click on a mood to set your mood</p>
      <div className='gap-1 grid grid-cols-10 min-w-fit my-4'>
        {emotions.map((emotion, i) => (
          <div
            key={i}
            className={`p-1 py-2 text-center capitalize w-28 cursor-pointer border hover:bg-green-700 dark:hover:bg-green-950 ${defaultMood === emotion ? 'bg-green-700 dark:bg-green-950 border-green-600 rounded-md' : 'bg-gray-400 dark:bg-gray-800 border-transparent'}`}
            onClick={()=>handleClick(i)}
          >
            {emotion}
          </div>
        ))}
      </div>
    </div>
  )
}
