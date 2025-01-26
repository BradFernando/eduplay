import { useState, useEffect } from "react"

export default function UserAvatar({ username, isActive, onLogout }) {
  const [firstLetter, setFirstLetter] = useState("")

  useEffect(() => {
    if (username) {
      setFirstLetter(username.charAt(0).toUpperCase())
    }
  }, [username])

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
        {firstLetter}
      </div>
      <div className="text-gray-900">
        <p className="font-bold text-lg text-gray-800">{username}</p>
        <p
          className={`text-sm font-medium ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg shadow-md transition duration-300"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
