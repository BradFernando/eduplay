"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const levels = [
  {
    id: 1,
    title: "Nivel 1: Biología Celular",
    intro: "Aprenderás sobre las células, sus estructuras y funciones.",
    questions: [
      {
        id: "bio1_1",
        topic: "Células",
        question: "¿Cuál es la principal diferencia entre una célula procariota y una eucariota?",
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
        topic: "Células",
        question: "¿Qué orgánulo celular es responsable de la síntesis de proteínas?",
        options: ["Mitocondrias", "Ribosomas", "Aparato de Golgi", "Lisosomas"],
        correctAnswer: 1,
      },
      {
        id: "célula_1",
        topic: "Célula",
        question: "¿Cuál es la unidad básica de la vida?",
        options: ["Célula", "Tejido", "Órgano", "Molécula"],
        correctAnswer: 0,
      },
      {
        id: "célula_2",
        topic: "Célula",
        question: "¿Qué estructura controla las actividades celulares?",
        options: ["Membrana celular", "Citoplasma", "Núcleo", "Mitocondria"],
        correctAnswer: 2,
      },
      {
        id: "célula_3",
        topic: "Célula",
        question: "¿Qué organelo produce energía en las células animales?",
        options: ["Cloroplasto", "Ribosoma", "Mitocondria", "Aparato de Golgi"],
        correctAnswer: 2,
      },
    ],
    requiredScore: 4,
    scoreWeight: 3.5,
  },
  {
    id: 2,
    title: "Nivel 2: Metabolismo y Energía",
    intro: "Explorarás cómo las células obtienen y utilizan energía.",
    questions: [
      {
        id: "bio2_1",
        topic: "Fotosíntesis",
        question: "¿Qué molécula es el principal producto de la fotosíntesis?",
        options: ["Oxígeno", "Glucosa", "Dióxido de carbono", "Agua"],
        correctAnswer: 1,
      },
      {
        id: "bio2_2",
        topic: "Fotosíntesis",
        question: "¿En qué parte de la célula tiene lugar la fotosíntesis?",
        options: ["Mitocondrias", "Cloroplastos", "Núcleo", "Ribosomas"],
        correctAnswer: 1,
      },
      {
        id: "célula_7",
        topic: "Célula",
        question: "¿Qué organelo está relacionado con la fotosíntesis?",
        options: ["Cloroplasto", "Mitocondria", "Núcleo", "Ribosoma"],
        correctAnswer: 0,
      },
      {
        id: "célula_8",
        topic: "Célula",
        question: "¿Qué líquido llena la mayor parte de la célula?",
        options: ["Citoplasma", "Núcleo", "Lisosomas", "Retículo endoplasmático"],
        correctAnswer: 0,
      },
    ],
    requiredScore: 3,
    scoreWeight: 3.5,
  },
  {
    id: 3,
    title: "Nivel 3: Genética",
    intro: "Aprenderás sobre el ADN, genes y la herencia genética.",
    questions: [
      {
        id: "bio3_1",
        topic: "Genética",
        question: "¿Qué es un gen?",
        options: [
          "Una molécula de ADN completa.",
          "Una secuencia de ADN que codifica para una proteína.",
          "Un orgánulo celular involucrado en la replicación.",
          "Una partícula extracelular."
        ],
        correctAnswer: 1,
      },
      {
        id: "genética_1",
        topic: "Genética",
        question: "¿Qué molécula contiene la información genética?",
        options: ["ARN", "ADN", "Proteína", "Carbohidrato"],
        correctAnswer: 1,
      },
      {
        id: "genética_3",
        topic: "Genética",
        question: "¿Qué cromosomas determinan el sexo en los humanos?",
        options: [
          "Autosomas",
          "Cromosomas sexuales",
          "Cromosomas mitocondriales",
          "Cromosomas ribosomales"
        ],
        correctAnswer: 1,
      },
      {
        id: "genética_5",
        topic: "Genética",
        question: "¿Cómo se llama el proceso por el cual el ADN se copia?",
        options: ["Traducción", "Transcripción", "Replicación", "Mutación"],
        correctAnswer: 2,
      },
    ],
    requiredScore: 3,
    scoreWeight: 3.0,
  }
];

export default function BiologiaTrivia() {
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
        body: JSON.stringify({ codUsuario, biologia: finalScore }),
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
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 py-12 flex flex-col items-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800 text-center">
          <h2 className="text-3xl font-bold mb-4">{levels[currentLevel].title}</h2>
          <p className="text-lg mb-6">{levels[currentLevel].intro}</p>
          <button
            onClick={() => setShowIntro(false)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 py-12 flex flex-col items-center">
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
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 py-12 flex flex-col items-center">
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
