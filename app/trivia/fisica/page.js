"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const levels = [
  {
    id: 1,
    title: "Nivel 1: Movimiento",
    intro: "En este nivel aprenderás sobre el movimiento de los objetos, incluyendo velocidad y aceleración.",
    questions: [
      {
        id: "nivel_1_pregunta_1",
        topic: "Movimiento",
        question: "Un proyectil es lanzado con una velocidad inicial de 30 m/s a un ángulo de 45°. ¿Cuál es su altura máxima?",
        options: ["22.9 m", "34.4 m", "45.8 m", "51.2 m"],
        correctAnswer: 0,
      },
      {
        id: "nivel_1_pregunta_2",
        topic: "Movimiento",
        question: "Si un coche acelera uniformemente desde el reposo hasta 20 m/s en 5 segundos, ¿cuál es su aceleración?",
        options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
        correctAnswer: 0,
      },
      {
        id: "nivel_1_pregunta_3",
        topic: "Movimiento",
        question: "Un objeto es lanzado horizontalmente desde una altura de 50 m. ¿Cuánto tiempo tarda en llegar al suelo?",
        options: ["3.2 s", "4.5 s", "2.1 s", "5.0 s"],
        correctAnswer: 0,
      },
    ],
    requiredScore: 3,
    scoreWeight: 3.5, // Ponderación sobre 10
  },
  {
    id: 2,
    title: "Nivel 2: Fuerzas y Energía",
    intro: "Aprenderás sobre las fuerzas que actúan en los objetos y cómo se relacionan con la energía.",
    questions: [
      {
        id: "nivel_2_pregunta_1",
        topic: "Fuerzas",
        question: "Un bloque de 5 kg se encuentra en un plano inclinado a 30° con un coeficiente de fricción de 0.25. ¿Cuál es la fuerza neta?",
        options: ["12.3 N", "15.4 N", "18.7 N", "20.1 N"],
        correctAnswer: 1,
      },
      {
        id: "nivel_2_pregunta_2",
        topic: "Energía",
        question: "Un motor realiza un trabajo de 2000 J en 10 segundos. ¿Cuál es su potencia?",
        options: ["100 W", "200 W", "300 W", "400 W"],
        correctAnswer: 3,
      },
    ],
    requiredScore: 2,
    scoreWeight: 3.5, // Ponderación sobre 10
  },
  {
    id: 3,
    title: "Nivel 3: Física Moderna",
    intro: "Explora conceptos avanzados como relatividad, mecánica cuántica y termodinámica.",
    questions: [
      {
        id: "nivel_3_pregunta_1",
        topic: "Física Cuántica",
        question: "¿Cuál es la energía del fotón con una frecuencia de 5×10¹⁴ Hz?",
        options: ["3.3×10⁻¹⁹ J", "1.2×10⁻¹⁹ J", "6.6×10⁻¹⁹ J", "4.1×10⁻¹⁹ J"],
        correctAnswer: 2,
      },
    ],
    requiredScore: 1,
    scoreWeight: 3, // Ponderación sobre 10
  },
]


export default function PhysicsTrivia() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);  // Estado para la puntuación total
  const [showResults, setShowResults] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const router = useRouter();

  const handleAnswer = (selectedIndex) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === levels[currentLevel].questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestion + 1 < levels[currentLevel].questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const proceedToNextLevel = () => {
    const levelMaxScore = levels[currentLevel].questions.length;
    const scorePercentage = score / levelMaxScore; // Convertir a porcentaje
    const calculatedScore = scorePercentage * levels[currentLevel].scoreWeight;
  
    setTotalScore((prevTotal) => {
      const newTotal = prevTotal + calculatedScore;
      console.log(`Total acumulado: ${newTotal.toFixed(1)}`); // Depuración
      return newTotal;
    });
  
    if (score >= levels[currentLevel].requiredScore && currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestion(0);
      setScore(0);
      setShowResults(false);
      setShowIntro(true);
    } else {
      submitFinalScore();
    }
  };
  
  const submitFinalScore = async () => {
    const finalScore = (totalScore + (score / levels[currentLevel].questions.length) * levels[currentLevel].scoreWeight).toFixed(1);
    console.log(`Enviando puntaje final: ${finalScore}`);  // Depuración
    const codUsuario = localStorage.getItem("codUsuario");
  
    try {
      const res = await fetch("/api/trivia/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codUsuario, fisica: finalScore }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update score");
      }
      const data = await res.json();
      console.log("Puntuación enviada:", data.message);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating score:", error);
      alert("Error al guardar la puntuación. Por favor, inténtalo de nuevo.");
    }
  };
  
  const exitWithCurrentScore = () => {
    submitFinalScore();
  };
  

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800 text-center">
          <h2 className="text-3xl font-bold mb-4">{levels[currentLevel].title}</h2>
          <p className="text-lg mb-6">{levels[currentLevel].intro}</p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Comenzar
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800 text-center">
          {score >= levels[currentLevel].requiredScore ? (
            <h2 className="text-3xl font-bold text-green-600 mb-4">¡Felicidades! Avanzaste al siguiente nivel</h2>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-red-600 mb-4">¡Uy! No alcanzaste el puntaje necesario</h2>
              <p className="text-lg mb-6">¿Deseas volver a intentarlo o salir con el puntaje actual?</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setShowResults(false);
                    setShowIntro(true);
                  }}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded"
                >
                  Reintentar
                </button>
                <button
                  onClick={exitWithCurrentScore}
                  className="mt-4 bg-gray-500 text-white px-6 py-2 rounded"
                >
                  Salir con puntaje actual
                </button>
              </div>
            </>
          )}
          {score >= levels[currentLevel].requiredScore && (
            <button onClick={proceedToNextLevel} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
              Siguiente Nivel
            </button>
          )}
        </div>
      </div>
    );
  }
  

  const question = levels[currentLevel].questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 flex flex-col items-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800 text-center">
        <h3 className="text-2xl font-bold mb-4">{question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-3 rounded ${
                answered
                  ? index === question.correctAnswer
                    ? "bg-green-200 text-green-800 font-bold"
                    : index === selectedAnswer
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-100"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
        {answered && (
          <div className="mt-4">
            {selectedAnswer === question.correctAnswer ? (
              <p className="text-green-600 font-bold">¡Correcto!</p>
            ) : (
              <p className="text-red-600 font-bold">
                Incorrecto. La respuesta correcta es: <span className="text-green-600">{question.options[question.correctAnswer]}</span>
              </p>
            )}
            <button onClick={nextQuestion} className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded">
              {currentQuestion + 1 < levels[currentLevel].questions.length ? "Siguiente Pregunta" : "Ver Resultados"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
