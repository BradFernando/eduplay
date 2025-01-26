"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: "Quim_1",
    text: "¿Qué es la materia?",
    options: ["Todo lo que ocupa espacio y tiene masa", "Solo las cosas que puedes ver", "Lo que desaparece cuando apagas la luz", "La excusa favorita de los químicos para todo"],
    correctAnswer: 0,
  },
  {
    id: "Quim_2",
    text: "¿Cómo se clasifica la materia en función de su composición?",
    options: ["Sustancias puras y mezclas", "Cosas aburridas y cosas interesantes", "Materiales visibles e invisibles", "Naturales y mágicas"],
    correctAnswer: 0,
  },
  {
    id: "Quim_3",
    text: "Una mezcla homogénea es:",
    options: ["Una mezcla en la que todos se llevan bien", "Una mezcla uniforme en toda su extensión", "Una mezcla de cosas opuestas", "Una mezcla que siempre se pelea"],
    correctAnswer: 1,
  },
  {
    id: "Quim_4",
    text: "¿Qué propiedad de la materia describe su capacidad de resistir ser aplastada?",
    options: ["Dureza", "Volumen", "Masa", "Rigidez emocional"],
    correctAnswer: 0,
  },
  {
    id: "Quim_5",
    text: "¿Qué propiedad describe cuánto espacio ocupa un objeto?",
    options: ["Volumen", "Masa", "Densidad", "Tamaño del ego del objeto"],
    correctAnswer: 0,
  },
  {
    id: "Quim_6",
    text: "¿Qué tipo de cambio ocurre cuando el agua se congela?",
    options: ["Cambio físico", "Cambio químico", "Cambio biológico", "Cambio nuclear"],
    correctAnswer: 0,
  },
  {
    id: "Quim_7",
    text: "¿Qué forma de energía alimenta el Sol?",
    options: ["Energía nuclear", "Energía térmica", "Energía cinética", "Energía mágica"],
    correctAnswer: 0,
  },
  {
    id: "Quim_8",
    text: "¿Qué caracteriza a los sólidos?",
    options: ["Tienen forma y volumen definidos", "Son flexibles como el aire", "Son invisibles", "Cambian de forma constantemente"],
    correctAnswer: 0,
  },
  {
    id: "Quim_9",
    text: "¿Qué modelo atómico se conoce como el 'modelo del budín de pasas'?",
    options: ["Modelo de Dalton", "Modelo de Thomson", "Modelo de Bohr", "Modelo de Schrödinger"],
    correctAnswer: 1,
  },
  {
    id: "Quim_10",
    text: "¿Cuál es el gas más común en el aire que respiras?",
    options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Vapor de agua"],
    correctAnswer: 1,
  },
]

export default function QuimicaTrivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const router = useRouter()

  const handleAnswer = (selectedIndex) => {
    if (answered) return
    setAnswered(true)
    setSelectedAnswer(selectedIndex)
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    setAnswered(false)
    setSelectedAnswer(null)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const submitScore = async () => {
    const codUsuario = localStorage.getItem("codUsuario")
    try {
      const res = await fetch("/api/trivia/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codUsuario, quimica: score }),
      })
      if (!res.ok) {
        throw new Error("Failed to update score")
      }
      const data = await res.json()
      console.log(data.message)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating score:", error)
      alert("Error al guardar la puntuación. Por favor, inténtalo de nuevo.")
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
        <div className="max-w-2xl mx-auto w-full px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-xl p-8 text-gray-800">
          <h2 className="text-2xl font-bold mb-4">Resultados de la Trivia de Química</h2>
          <p className="text-xl mb-4">
            Tu puntaje: {score} de {questions.length}
          </p>
          <button
            onClick={submitScore}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Guardar Resultados
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
      <div className="max-w-2xl mx-auto w-full px-6 sm:px-8 lg:px-10 bg-white rounded-lg shadow-xl p-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">{question.text}</h2>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-2 rounded ${
                answered
                  ? index === question.correctAnswer
                    ? "bg-green-200 text-green-800"
                    : index === selectedAnswer
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-4 text-gray-600">
          Pregunta {currentQuestion + 1} de {questions.length}
        </p>
        {answered && (
          <button
            onClick={nextQuestion}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {currentQuestion + 1 < questions.length ? "Siguiente Pregunta" : "Ver Resultados"}
          </button>
        )}
      </div>
    </div>
  )
}
