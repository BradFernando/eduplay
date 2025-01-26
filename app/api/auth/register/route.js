import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"

export async function POST(req) {
  try {
    await dbConnect()
    const { username, password, email } = await req.json()

    // Generar codUsuario único
    const codUsuario = "USER" + Math.random().toString(36).substr(2, 9)

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return NextResponse.json({ message: "Usuario o email ya existe" }, { status: 400 })
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear nuevo usuario
    const newUser = new User({
      codUsuario,
      username,
      password: hashedPassword,
      email,
    })

    await newUser.save()

    return NextResponse.json({ message: "Usuario registrado exitosamente", codUsuario }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 })
  }
}

