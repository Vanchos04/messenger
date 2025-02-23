import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createChat, fetchUserChats, fetchUsers } from '@/api/userApi'
import { useEffect, useState } from 'react'
import { MessageSquare, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router'

export interface User {
  id: number
  username: string
  email: string
}

export function UserListPage() {
  const currentUserId = Number(localStorage.getItem('userId'))
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const { data: chats = [], isLoading: isLoadingChats } = useQuery({
    queryKey: ['chats', currentUserId],
    queryFn: () => fetchUserChats(currentUserId),
    enabled: !!currentUserId,
  })

  const hasChatWithUser = (userId: number) => {
    return chats?.some(
      (chat: any) =>
        (chat.userId === currentUserId && chat.directPartnerId === userId) ||
        (chat.userId === userId && chat.directPartnerId === currentUserId),
    )
  }

  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const filtered = users.filter((user) => user.id !== currentUserId)
      setFilteredUsers(filtered)
    }
  }, [users, currentUserId])

  const getChatWithUser = (userId: number) => {
    return chats.find(
      (chat: any) =>
        (chat.userId === currentUserId && chat.directPartnerId === userId) ||
        (chat.userId === userId && chat.directPartnerId === currentUserId),
    )
  }

  const createChatMutation = useMutation({
    mutationFn: (userId: number) => createChat(currentUserId, userId),
    onSuccess: (newChat) => {
      queryClient.invalidateQueries({ queryKey: ['chats', currentUserId] })
      navigate(`/chat/${newChat.id}`)
    },
  })

  const handleChatClick = (userId: number) => {
    const existingChat = getChatWithUser(userId)

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`)
    } else {
      createChatMutation.mutate(userId) // Create new chat
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Contacts</h1>
      {isLoadingUsers || isLoadingChats ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const hasChat = hasChatWithUser(user.id)

              return (
                <li key={user.id} className="border p-2 my-2 flex justify-between items-center">
                  <div>
                    {user.username} ({user.email})
                  </div>

                  {hasChat ? (
                    <MessageSquare className="text-black-500 cursor-pointer" onClick={() => handleChatClick(user.id)} />
                  ) : (
                    <UserPlus className="text-black-500 cursor-pointer" onClick={() => handleChatClick(user.id)} />
                  )}
                </li>
              )
            })
          ) : (
            <p>No users found</p>
          )}
        </ul>
      )}
    </div>
  )
}
