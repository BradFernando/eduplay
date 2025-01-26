"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: "mov1_1",
    text: "Si un objeto se mueve a una velocidad constante de 10 m/s, ¿cuánto tiempo tardará en recorrer 50 metros?",
    options: ["5 s", "10 s", "15 s", "20 s"],
    correctAnswer: 0,
  },
  {
    id: "mov1_2",
    text: "Un coche acelera uniformemente desde el reposo hasta 20 m/s en 5 segundos. ¿Cuál es su aceleración?",
    options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
    correctAnswer: 0,
  },
  {
    id: "for2_1",
    text: "Si una fuerza de 10 N actúa sobre un objeto de 2 kg, ¿cuál será su aceleración?",
    options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
    correctAnswer: 1,
  },
  {
    id: "for2_2",
    text: "Un objeto en reposo permanece así a menos que...",
    options: ["experimente una fuerza neta", "tenga masa", "tenga velocidad", "tenga energía"],
    correctAnswer: 0,
  },
  {
    id: "trab3_1",
    text: "Si una fuerza de 10 N mueve un objeto 5 m en la misma dirección, ¿cuánto trabajo realiza?",
    options: ["10 J", "25 J", "50 J", "100 J"],
    correctAnswer: 2,
  },
  {
    id: "mec4_1",
    text: "Un cuerpo de 5 kg está suspendido por dos cuerdas que forman ángulos de 45° con la horizontal. ¿Cuál es la tensión en cada cuerda?",
    options: ["34.6 N", "49 N", "69.3 N", "98 N"],
    correctAnswer: 0,
  },
  {
    id: "elec7_1",
    text: "Si un circuito tiene una resistencia de 10 Ω y se aplica una tensión de 20 V, ¿cuál es la corriente que circula?",
    options: ["0.5 A", "1 A", "2 A", "4 A"],
    correctAnswer: 2,
  },
  {
    id: "mas8_1",
    text: "Un oscilador tiene una frecuencia de 5 Hz. ¿Cuál es su período?",
    options: ["0.2 s", "0.4 s", "0.5 s", "2 s"],
    correctAnswer: 0,
  },
  {
    id: "cam9_1",
    text: "¿Cuál es la fuerza entre dos cargas de 2 C separadas por 1 m en el vacío? (k = 9×10⁹ N·m²/C²)",
    options: ["18×10⁹ N", "9×10⁹ N", "36×10⁹ N", "45×10⁹ N"],
    correctAnswer: 2,
  },
  {
    id: "mod10_2",
    text: "¿Qué propiedad de un electrón permite describirlo como una onda según el modelo de Louis de Broglie?",
    options: ["Su carga", "Su masa", "Su longitud de onda", "Su velocidad"],
    correctAnswer: 2,
  },
]

export default function FisicaTrivia() {
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
        body: JSON.stringify({ codUsuario, fisica: score }),
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
          <h2 className="text-2xl font-bold mb-4">Resultados de la Trivia de Física</h2>
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