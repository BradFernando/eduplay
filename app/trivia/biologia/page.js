"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: "bio1_1",
    text: "¿Cuál es la principal diferencia entre una célula procariota y una eucariota?",
    options: [
      "Las procariotas tienen un núcleo definido y las eucariotas no.",
      "Las eucariotas poseen organelos membranosos, mientras que las procariotas no.",
      "Las procariotas tienen ADN lineal y las eucariotas ADN circular.",
      "Las eucariotas carecen de membrana plasmática y las procariotas la tienen."
    ],
    correctAnswer: 1,
  },
  {
    id: "bio1_2",
    text: "¿Qué orgánulo celular es responsable de la síntesis de proteínas?",
    options: [
      "Mitocondrias",
      "Ribosomas",
      "Aparato de Golgi",
      "Lisosomas"
    ],
    correctAnswer: 1,
  },
  {
    id: "bio2_1",
    text: "¿Qué molécula es el principal producto de la fotosíntesis?",
    options: [
      "Oxígeno",
      "Glucosa",
      "Dioxido de carbono",
      "Agua"
    ],
    correctAnswer: 1,
  },
  {
    id: "bio2_2",
    text: "¿En qué parte de la célula tiene lugar la fotosíntesis?",
    options: [
      "Mitocondrias",
      "Cloroplastos",
      "Núcleo",
      "Ribosomas"
    ],
    correctAnswer: 1,
  },
  {
    id: "bio3_1",
    text: "¿Qué es un gen?",
    options: [
      "Una molécula de ADN completa.",
      "Una secuencia de ADN que codifica para una proteína.",
      "Un orgánulo celular involucrado en la replicación.",
      "Una partícula extracelular."
    ],
    correctAnswer: 1,
  },
  {
    id: "bio4_1",
    text: "¿Quién propuso la teoría de la selección natural?",
    options: [
      "Gregor Mendel",
      "Charles Darwin",
      "Louis Pasteur",
      "Alexander Fleming"
    ],
    correctAnswer: 1,
  },
  {
    id: "bio5_1",
    text: "¿Qué tipo de reproducción produce descendencia genéticamente idéntica?",
    options: [
      "Sexual",
      "Asexual",
      "Conjugación",
      "Partenogénesis"
    ],
    correctAnswer: 1,
  },
  {
    id: "bio6_1",
    text: "¿Qué es un bioma?",
    options: [
      "Un ecosistema acuático.",
      "Una región con clima y comunidades de organismos similares.",
      "Un grupo de organismos de la misma especie.",
      "Un tipo de interacción simbótica."
    ],
    correctAnswer: 1,
  },
  {
    id: "bio7_1",
    text: "¿Cuál es la principal característica de los virus?",
    options: [
      "Tienen metabolismo propio.",
      "Son organismos unicelulares.",
      "Necesitan un hospedador para reproducirse.",
      "Son visibles al microscopio óptico."
    ],
    correctAnswer: 2,
  },
  {
    id: "bio8_1",
    text: "¿Cuál es el órgano principal del sistema nervioso central?",
    options: [
      "El corazón.",
      "El cerebro.",
      "La médula espinal.",
      "El estómago."
    ],
    correctAnswer: 1,
  }
]

export default function BiologiaTrivia() {
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
        body: JSON.stringify({ codUsuario, biologia: score }),
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
          <h2 className="text-2xl font-bold mb-4">Resultados de la Trivia de Biología</h2>
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

