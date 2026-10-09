const bcryptRounds = Number(process.env.BCRYPT_ROUNDS) || 12;



export const env = {
  bcryptRounds,
}