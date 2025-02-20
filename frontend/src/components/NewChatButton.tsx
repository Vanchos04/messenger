import { useNavigate } from 'react-router'

const NewChatButton = () => {
  const navigate = useNavigate()

  return (
    <button
      className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
      onClick={() => navigate('/new-chat')}
    >
      + New Chat
    </button>
  )
}

export default NewChatButton
