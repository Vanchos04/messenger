export interface Chat {
  id: number
  name: string
}

interface ChatListProps {
  chats: Chat[]
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>{chat.name}</div>
      ))}
    </div>
  )
}
