import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Trivia from "../../../models/Trivia"

export async function POST(req) {
  try {
    await dbConnect()
    const { codUsuario } = await req.json()

    // Generar codTrivia único
    const codTrivia = "TRIV" + Math.random().toString(36).substr(2, 9)

    // Crear nueva trivia
    const newTrivia = new Trivia({
      codTrivia,
      codUsuario,
    })

    await newTrivia.save()

    return NextResponse.json({ message: "Trivia creada exitosamente", codTrivia }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

