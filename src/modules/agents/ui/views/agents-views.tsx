'use client'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
export const AgentsViews = () => {
  const trpc = useTRPC()
  const { data, isLoading, isError } = useQuery(trpc.agents.getMany.queryOptions())
  if (isLoading) {
    return (
      <LoadingState title="Loading Agent" description='It may take few Second' />
    )
  }
  if (isError) {
    return (
      <ErrorState title="Error Loading Agent" description='Please try again later' />
    )
  }
  return (
    <div className='flex flex-col gap-y-4 p-4 '>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
