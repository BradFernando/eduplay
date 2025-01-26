import { useState, useEffect } from "react";

export default function UserAvatar({ username, isActive, onLogout }) {
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    if (username) {
      setFirstLetter(username.charAt(0).toUpperCase());
    }
  }, [username]);

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto sm:mx-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg">
        {firstLetter}
      </div>
      <div className="text-gray-900 text-center sm:text-left">
        <p className="font-bold text-base sm:text-lg text-gray-800">{username}</p>
        <p
          className={`text-xs sm:text-sm font-medium ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </p>
      </div>
      <button
        onClick={onLogout}
        className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 text-sm sm:text-base"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
