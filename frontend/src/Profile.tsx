import { useQuery } from '@tanstack/react-query'
import { api } from './axios'

type UserProfile = {
  id: number
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
  updatedAt: string
}

async function fetchUserProfile() {
  const { data } = await api.get<UserProfile>('/users')
  return data
}

export function Profile() {
  const { data, error, isLoading } = useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>User Profile</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
