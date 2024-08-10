import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TrackSkeleton() {
  return (
    <SkeletonTheme baseColor='rgba(0, 0, 0, 0.06)' highlightColor='rgba(255, 255, 255, 0.049)'>
      <div className='p-4 flex gap-2 items-center'>
        <Skeleton width={100} height={100} className='w-full h-full rounded-md' />
        <div className='flex flex-col flex-grow'>
          <Skeleton width={200} height={20} className='mb-2' />
          <Skeleton width={130} height={15} />
          <Skeleton width={240} height={15} />
        </div>
        <div className='flex flex-col gap-1'>
          <Skeleton width={80} height={25} />
          <Skeleton width={80} height={25} />
        </div>
      </div>
    </SkeletonTheme>
  )
}
