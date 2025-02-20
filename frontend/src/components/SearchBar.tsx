import { useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('')

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search chats..."
      className="w-full p-2 border rounded-md mb-4"
    />
  )
}

export default SearchBar
