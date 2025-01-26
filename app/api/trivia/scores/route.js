import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Trivia from "../../../models/Trivia"

export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const codUsuario = searchParams.get("codUsuario")

    if (!codUsuario) {
      return NextResponse.json({ message: "Código de usuario requerido" }, { status: 400 })
    }

    const trivias = await Trivia.find({ codUsuario })

    const scores = {
      fisica: 0,
      quimica: 0,
      biologia: 0,
    }

    trivias.forEach((trivia) => {
      scores.fisica = Math.max(scores.fisica, trivia.puntajeFisica)
      scores.quimica = Math.max(scores.quimica, trivia.puntajeQuimica)
      scores.biologia = Math.max(scores.biologia, trivia.puntajeBiologia)
    })

    return NextResponse.json({ scores }, { status: 200 })
  } catch (error) {
    console.error("Error fetching trivia scores:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

