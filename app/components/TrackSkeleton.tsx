import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TrackSkeleton() {
  return (
    <SkeletonTheme baseColor='rgba(0, 0, 0, 0.06)' highlightColor='rgba(255, 255, 255, 0.049)'>
      <Skeleton count={5} className='w-full h-4' />
    </SkeletonTheme>
  )
}
