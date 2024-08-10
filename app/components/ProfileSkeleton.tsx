import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor='rgba(0, 0, 0, 0.06)' highlightColor='rgba(255, 255, 255, 0.049)'>
      <div className="flex items-center justify-center gap-2">
        <Skeleton width={130} height={20} />
        <Skeleton circle width={40} height={40} />
        <Skeleton width={80} height={40} className='rounded-md' />
      </div>
    </SkeletonTheme>
  )
}
