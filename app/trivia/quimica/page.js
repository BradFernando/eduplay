"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const levels = [
  {
    id: 1,
    title: "Nivel 1: Conceptos Básicos de Química",
    intro: "Aprenderás sobre los conceptos básicos como estados de la materia y cambios físicos y químicos.",
    questions: [
      {
        id: "Q1_1",
        topic: "Materia y su División",
        question: "¿Qué es una mezcla homogénea?",
        options: ["Una mezcla uniforme en toda su extensión", "Una mezcla en la que todos se llevan bien", "Una mezcla visible y heterogénea", "Una mezcla que cambia constantemente"],
        correctAnswer: 0,
      },
      {
        id: "Q1_2",
        topic: "Cambios Físico-Químicos",
        question: "¿Qué ocurre cuando el agua se congela?",
        options: ["Cambio físico (cambia de estado)", "Cambio químico (se transforma en otro compuesto)", "Se convierte en plasma", "Se descompone en hidrógeno y oxígeno"],
        correctAnswer: 0,
      },
      {
        id: "Q1_3",
        topic: "Tipos de Energía",
        question: "¿Qué tipo de energía utiliza un panel solar?",
        options: ["Energía luminosa", "Energía química", "Energía potencial", "Energía nuclear"],
        correctAnswer: 0,
      },
      {
        id: "Q1_4",
        topic: "Estados de la Materia",
        question: "¿Qué estado de la materia tiene forma y volumen definidos?",
        options: ["Sólido", "Líquido", "Gas", "Plasma"],
        correctAnswer: 0,
      },
      {
        id: "Q1_5",
        topic: "Modelos Atómicos",
        question: "¿Quién propuso que los átomos son indivisibles y homogéneos?",
        options: ["Dalton", "Thomson", "Bohr", "Rutherford"],
        correctAnswer: 0,
      },
      {
        id: "Q1_6",
        topic: "Tabla Periódica",
        question: "¿Qué elemento químico tiene el símbolo 'O'?",
        options: ["Oxígeno", "Oro", "Osmio", "Óxido"],
        correctAnswer: 0,
      },
      {
        id: "Q1_7",
        topic: "Enlaces Químicos",
        question: "¿Qué enlace une átomos compartiendo electrones?",
        options: ["Enlace covalente", "Enlace iónico", "Enlace metálico", "Enlace físico"],
        correctAnswer: 0,
      },
      {
        id: "Q1_8",
        topic: "Reacciones Químicas",
        question: "¿Qué gas se libera en una reacción de ácido con metal?",
        options: ["Hidrógeno", "Oxígeno", "Dióxido de carbono", "Helio"],
        correctAnswer: 0,
      },
      {
        id: "Q1_9",
        topic: "Compuestos Químicos",
        question: "¿Qué compuesto se conoce como el agua de la vida?",
        options: ["H₂O", "H₂SO₄", "CH₃OH", "NH₃"],
        correctAnswer: 0,
      },
      {
        id: "Q1_10",
        topic: "Energía Térmica",
        question: "¿Qué ocurre al calentar un sólido hasta que se convierte en líquido?",
        options: ["Fusión", "Evaporación", "Sublimación", "Condensación"],
        correctAnswer: 0,
      },
    ],
    requiredScore: 8,
    scoreWeight: 3.5,
  },
  {
    id: 2,
    title: "Nivel 2: Reacciones Químicas",
    intro: "Explorarás conceptos de reacciones químicas y compuestos esenciales.",
    questions: [
      {
        id: "Q2_1",
        topic: "Reacciones Químicas",
        question: "¿Qué gas se libera en una reacción de ácido con metal?",
        options: ["Hidrógeno", "Oxígeno", "Dióxido de carbono", "Helio"],
        correctAnswer: 0,
      },
      {
        id: "Q2_2",
        topic: "Estados de la Materia",
        question: "¿Qué ocurre cuando un sólido pasa directamente a gas?",
        options: ["Fusión", "Sublimación", "Condensación", "Evaporación"],
        correctAnswer: 1,
      },
      {
        id: "Q2_3",
        topic: "Modelos Atómicos",
        question: "¿Qué descubrió Rutherford en su experimento con láminas de oro?",
        options: ["El núcleo atómico", "Los electrones", "Los neutrones", "Los protones"],
        correctAnswer: 0,
      },
      {
        id: "Q2_4",
        topic: "Tabla Periódica",
        question: "¿Qué elemento es esencial para la vida y está presente en el agua?",
        options: ["Hidrógeno", "Oxígeno", "Carbono", "Nitrógeno"],
        correctAnswer: 1,
      },
      {
        id: "Q2_5",
        topic: "Enlaces Químicos",
        question: "¿Qué sucede cuando un átomo cede un electrón a otro átomo?",
        options: ["Se forma un enlace covalente", "Se forma un enlace iónico", "Se convierte en un átomo neutro", "Se desintegra"],
        correctAnswer: 1,
      },
      {
        id: "Q2_6",
        topic: "Compuestos Químicos",
        question: "¿Qué compuesto se forma al reaccionar hidrógeno con oxígeno?",
        options: ["Hidróxido de sodio", "Agua", "Dióxido de carbono", "Amoniaco"],
        correctAnswer: 1,
      },
      {
        id: "Q2_7",
        topic: "Reacciones con Oxígeno",
        question: "¿Qué ocurre cuando el magnesio se quema en presencia de oxígeno?",
        options: ["Forma óxido de magnesio y libera luz brillante", "Se derrite sin formar compuestos", "Desaparece sin dejar rastro", "Libera oxígeno puro"],
        correctAnswer: 0,
      },
      {
        id: "Q2_8",
        topic: "Compuestos Químicos",
        question: "¿Qué compuesto se forma al reaccionar hidrógeno con oxígeno?",
        options: ["Hidróxido de sodio", "Agua", "Dióxido de carbono", "Amoniaco"],
        correctAnswer: 1,
      },
      {
        id: "Q2_9",
        topic: "Valencias de Metales",
        question: "¿Qué metal tiene valencia +1 y se encuentra en la sal común?",
        options: ["Sodio", "Potasio", "Calcio", "Magnesio"],
        correctAnswer: 0,
      },
      {
        id: "Q2_10",
        topic: "Energía Térmica",
        question: "¿Qué tipo de transferencia de calor ocurre al hervir agua?",
        options: ["Conducción", "Convección", "Radiación", "Fusión"],
        correctAnswer: 1,
      },
    ],
    requiredScore: 8,
    scoreWeight: 3.5,
  },
]


export default function QuimicaTrivia() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
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
    const scorePercentage = score / levelMaxScore;
    const calculatedScore = scorePercentage * levels[currentLevel].scoreWeight;

    setTotalScore((prevTotal) => prevTotal + calculatedScore);

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
    const finalScore = (
      totalScore +
      (score / levels[currentLevel].questions.length) * levels[currentLevel].scoreWeight
    ).toFixed(1);
    const codUsuario = localStorage.getItem("codUsuario");

    try {
      const res = await fetch("/api/trivia/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codUsuario, quimica: finalScore }),
      });
      if (!res.ok) {
        throw new Error("Failed to update score");
      }
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
    );
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

  const question = levels[currentLevel].questions[currentQuestion];

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
  );
}
