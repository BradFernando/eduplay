import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Trivia from "../../../models/Trivia"

export async function POST(req) {
  try {
    await dbConnect()
    const { codUsuario } = await req.json()

    if (!codUsuario) {
      return NextResponse.json({ message: "El código de usuario es requerido" }, { status: 400 })
    }

    // Verificar si la trivia ya existe
    let trivia = await Trivia.findOne({ codUsuario })

    if (!trivia) {
      // Generar un codTrivia único
      const codTrivia = `TRIVIA_${Math.random().toString(36).slice(2, 10).toUpperCase()}`

      trivia = new Trivia({
        codTrivia,
        codUsuario,
        puntajeFisica: 0,
        puntajeQuimica: 0,
        puntajeBiologia: 0,
        triviaCompleta: false,
      })

      await trivia.save()
    }

    return NextResponse.json({ message: "Trivia creada o existente", trivia }, { status: 200 })
  } catch (error) {
    console.error("Error creando la trivia:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}
