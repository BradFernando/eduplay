"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserAvatar from "../components/UserAvatar";

export default function Dashboard() {
  const [codUsuario, setCodUsuario] = useState("");
  const [username, setUsername] = useState("");
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCodUsuario = localStorage.getItem("codUsuario");
    const storedUsername = localStorage.getItem("username");
    if (!storedCodUsuario || !storedUsername) {
      router.push("/login");
    } else {
      setCodUsuario(storedCodUsuario);
      setUsername(storedUsername);
      setIsActive(true);
    }
  }, [router]);

  const handleCreateTrivia = async () => {
    const res = await fetch("/api/trivia/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codUsuario }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("codUsuario");
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
      <div className="max-w-3xl mx-auto w-full px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center py-6 border-b">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <UserAvatar username={username} isActive={isActive} onLogout={handleLogout} />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700">Bienvenido, {username}!</h2>
          <p className="mt-2 text-gray-500 text-lg">Tu código de usuario es: <span className="font-bold text-indigo-600">{codUsuario}</span></p>
          <div className="mt-8 text-center">
            <button
              onClick={handleCreateTrivia}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Crear nueva trivia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
