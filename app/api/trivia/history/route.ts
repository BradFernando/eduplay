import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Trivia from "../../../models/Trivia"

export async function GET(req: Request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const codUsuario = searchParams.get("codUsuario")

    if (!codUsuario) {
      return NextResponse.json({ message: "Código de usuario requerido" }, { status: 400 })
    }

    const triviaHistory = await Trivia.find({ codUsuario }).sort({ _id: -1 })

    return NextResponse.json({ history: triviaHistory }, { status: 200 })
  } catch (error) {
    console.error("Error fetching trivia history:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

