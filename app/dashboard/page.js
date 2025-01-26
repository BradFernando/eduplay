"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UserAvatar from "../components/UserAvatar"
import { Beaker, Brain, Atom, ExternalLink } from "lucide-react"

export default function Dashboard() {
  const [codUsuario, setCodUsuario] = useState("")
  const [username, setUsername] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [triviaScores, setTriviaScores] = useState({
    fisica: 0,
    quimica: 0,
    biologia: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const storedCodUsuario = localStorage.getItem("codUsuario");
    const storedUsername = localStorage.getItem("username");
  
    console.log("CodUsuario obtenido del localStorage:", storedCodUsuario);
  
    if (!storedCodUsuario || !storedUsername) {
      router.push("/login");
    } else {
      setCodUsuario(storedCodUsuario);
      setUsername(storedUsername);
      setIsActive(true);
      fetchTriviaScores(storedCodUsuario);
    }
  }, [router]);

  const fetchTriviaScores = async (codUsuario) => {
    try {
      const res = await fetch(`/api/trivia/scores?codUsuario=${codUsuario}`)
      if (!res.ok) {
        throw new Error("Failed to fetch trivia scores")
      }
      const data = await res.json()
      setTriviaScores(data.scores)
    } catch (error) {
      console.error("Error fetching trivia scores:", error)
    }
  }

  const handleStartTrivia = async (subject) => {
    try {
      const response = await fetch("/api/trivia/start-trivia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codUsuario }),
      });
  
      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error de la API:", errorMessage);
        throw new Error(`Error en la API: ${errorMessage}`);
      }
  
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Trivia creada:", data);
        router.push(`/trivia/${subject}`);
      } else {
        throw new Error("La respuesta de la API no es JSON válido.");
      }
    } catch (error) {
      console.error("Error iniciando trivia:", error);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("codUsuario")
    localStorage.removeItem("username")
    router.push("/")
  }

  const subjectIcons = {
    fisica: <span className="text-2xl">⚛️</span>,
    quimica: <span className="text-2xl">🧪</span>,
    biologia: <span className="text-2xl">🧠</span>,
  }


  const simulatorLinks = {
    fisica: [
      {
        id: "mov1_1",
        topic: "Movimiento",
        link: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html?locale=es",
      },
      {
        id: "for2_1",
        topic: "Fuerzas",
        link: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html?locale=es",
      },
    ],
    quimica: [
      {
        id: "trab3_1",
        topic: "Trabajo y energía",
        link: "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_all.html?locale=es",
      },
      {
        id: "mec4_1",
        topic: "Mecánica",
        link: "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_all.html?locale=es",
      },
    ],
    biologia: [
      {
        id: "ond5_1",
        topic: "Ondas, sonido y luz",
        link: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_all.html?locale=es",
      },
      {
        id: "ter6_1",
        topic: "Energía térmica y termodinámica",
        link: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_all.html?locale=es",
      },
    ],
  };


  const studyMaterials = {
    fisica: "https://es.khanacademy.org/science/hs-physics",
    quimica: "https://es.khanacademy.org/science/quimica-pe-pre-u/xa105e22a677145a0:estructura-atomica",
    biologia: "https://es.khanacademy.org/science/high-school-biology",
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex justify-between items-center py-6 px-6 sm:px-8 border-b">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 drop-shadow-md tracking-wide text-center">
            EduPlay Inicio
          </h1>
            <UserAvatar username={username} isActive={isActive} onLogout={handleLogout} />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Bienvenido, {username}!</h2>
            <p className="mb-8 text-gray-600 text-lg">
              Tu código de usuario es: <span className="font-bold text-indigo-600">{codUsuario}</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["fisica", "quimica", "biologia"].map((subject) => (
                <div
                  key={subject}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 capitalize">
                        {subject.charAt(0).toUpperCase() + subject.slice(1)}
                      </h3>
                      <div className="text-3xl">{subjectIcons[subject]}</div>
                    </div>
                    <p className="text-5xl font-extrabold text-indigo-600 mb-4">
                      {triviaScores[subject]} <span className="text-3xl">/10</span>
                    </p>
                    <p className="text-gray-600 text-lg mb-6">Mejor puntaje</p>
                    <button
                      onClick={() => handleStartTrivia(subject)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 w-full text-lg shadow-md hover:shadow-lg"
                    >
                      Iniciar Trivia
                    </button>
                  </div>
                  <div className="bg-gray-100 px-6 py-5 rounded-b-xl">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Simuladores:</h4>
                    <ul className="space-y-2">
                      {simulatorLinks[subject].map((sim) => (
                        <li key={sim.id}>
                          <a
                            href={sim.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-all duration-300 text-lg font-medium"
                          >
                            {sim.topic} <ExternalLink className="ml-1 w-5 h-5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 px-6 py-5 rounded-b-xl border-t">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">Material de Estudio:</h4>
                    <a
                      href={studyMaterials[subject]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500 hover:text-blue-700 transition-all duration-300 text-lg font-medium"
                    >
                      Ver material de estudio <ExternalLink className="ml-2 w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

