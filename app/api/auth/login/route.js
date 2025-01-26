import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"

export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json()
    const { username, password } = body

    // Buscar usuario
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 400 })
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 400 })
    }

    // Actualizar status a true
    user.status = true
    await user.save()

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    // Asegúrate de que estás devolviendo un objeto plano
    return NextResponse.json(
      {
        message: "Login exitoso",
        token,
        codUsuario: user.codUsuario,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error en el servidor:", error)
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

