import SearchBar from '@/components/SearchBar.tsx'
import NewChatButton from '@/components/NewChatButton.tsx'
import { fetchChats } from '@/api/chatApi.ts'
import { useQuery } from '@tanstack/react-query'
import ChatItem from '@/components/ChatIem.tsx'

export function ChatPage() {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  })

  return (
    <div className="flex flex-col h-screen p-4">
      <SearchBar />

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col">
          {chats?.length ? (
            chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
          ) : (
            <p className="text-center text-gray-500">No chats found</p>
          )}
        </div>
      )}

      <NewChatButton />
    </div>
  )
}
