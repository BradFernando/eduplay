import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import Trivia from "../../../models/Trivia"

export async function POST(req) {
  try {
    await dbConnect()
    const { codUsuario, fisica, quimica, biologia } = await req.json()

    const updateFields = {}
    if (fisica !== undefined) updateFields.puntajeFisica = fisica
    if (quimica !== undefined) updateFields.puntajeQuimica = quimica
    if (biologia !== undefined) updateFields.puntajeBiologia = biologia

    const updatedTrivia = await Trivia.findOneAndUpdate(
      { codUsuario },
      { $max: updateFields },
      { new: true, upsert: true },
    )

    if (!updatedTrivia) {
      return NextResponse.json({ message: "No se pudo actualizar la trivia" }, { status: 404 })
    }

    return NextResponse.json({ message: "Puntuación actualizada exitosamente", trivia: updatedTrivia }, { status: 200 })
  } catch (error) {
    console.error("Error updating trivia score:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

