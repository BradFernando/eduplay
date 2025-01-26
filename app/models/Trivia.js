import mongoose from "mongoose"

const TriviaSchema = new mongoose.Schema({
  codTrivia: {
    type: String,
    required: true,
    unique: true,
  },
  codUsuario: {
    type: String,
    required: true,
  },
  puntajeFisica: {
    type: Number,
    default: 0,
  },
  puntajeQuimica: {
    type: Number,
    default: 0,
  },
  puntajeBiologia: {
    type: Number,
    default: 0,
  },
  triviaCompleta: {
    type: Boolean,
    default: false,
  },
})

TriviaSchema.pre("save", function (next) {
  if (this.puntajeFisica !== 0 && this.puntajeQuimica !== 0 && this.puntajeBiologia !== 0) {
    this.triviaCompleta = true
  }
  next()
})

export default mongoose.models.Trivia || mongoose.model("Trivia", TriviaSchema)

