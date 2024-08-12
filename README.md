# MoodList Application

This is a Spotify based project to generate and create a playlist based on your mood with the selection of genres.
The project used Next.js as a base and TailwindCSS for styling and works fine with both dark or light mode but I it's not responsive enough to cover mobile's screen sizes!
For the playlist creation, I used the Spotify API endpoint of `recommendations` that have many request parameters but I used only the `seed_energy` and `seed_valence` for the Energy and Pleasantness levels that need a value between 0.0 and 1.0.

I used few react packages to make the UI more interactive like `react-loading-skeleton` for profile and playlist's tracks, and the other package is `react-spotify-embed` that literally is a embedded player iframe. I could use Spotify web player api to have more control and better result but I needed to be a premium account to use it.

Note: The logout button is just a redirect to the main page without the token (`code`) as url parameter.

## Live Demo

There is a live demo hosted on Vercel at [https://mood-list.vercel.app](https://mood-list.vercel.app)

## Getting Started

First, Add your Spotify Client ID and Client Secret to the `.env` file.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
