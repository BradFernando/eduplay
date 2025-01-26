import { useState, useEffect } from "react"

export default function UserAvatar({ username, isActive, onLogout }) {
  const [firstLetter, setFirstLetter] = useState("")

  useEffect(() => {
    if (username) {
      setFirstLetter(username.charAt(0).toUpperCase())
    }
  }, [username])

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
          {firstLetter}
        </div>
        <div className="text-sm">
          <p className="font-semibold">{username}</p>
          <p className={`text-xs ${isActive ? "text-green-500" : "text-red-500"}`}>
            {isActive ? "Activo" : "Inactivo"}
          </p>
        </div>
      </div>
      <button onClick={onLogout} className="mt-2 text-sm text-red-600 hover:text-red-800">
        Cerrar sesión
      </button>
    </div>
  )
}

