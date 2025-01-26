import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  codUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)

