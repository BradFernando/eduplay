import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <main className="text-center">
        <div className="mb-8">
          <Image src="/logo.svg" alt="EduPlay Logo" width={200} height={200} className="mx-auto" />
        </div>
        <h1 className="text-6xl font-bold mb-4">EduPlay</h1>
        <p className="text-2xl mb-8">¡Aprende y diviértete con nuestras trivias educativas!</p>
        <Link
          href="/login"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-full text-xl transition duration-300 transform hover:scale-105"
        >
          Jugar la Trivia
        </Link>
        <p className="mt-6 text-lg">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="underline hover:text-yellow-300">
            Regístrate aquí
          </Link>
        </p>
      </main>
      <footer className="mt-auto pb-4">
        <p>&copy; 2023 EduPlay. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

