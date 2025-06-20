// En este archivo se realiza la conexión a la base de datos MariaDB

// Importa la función necesaria desde 'mariadb'
import mariadb from 'mariadb'

// Importa dotenv para usar variables de entorno
import * as dotenv from 'dotenv'
dotenv.config()

// Define la configuración de conexión
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
}

// Declara la variable de conexións
let connection: any

// Función asincrónica que establece la conexión a la base de datos
async function connectToDatabase(): Promise<void> {
  connection = await mariadb.createConnection(dbConfig)
}

// Llama a la función de conexión
connectToDatabase()

// Define el tipo de objeto esperado para insertar saludos
export type Param = {
  greet: string,
  language: string
}

// Clase que interactúa con la base de datos
export class Greet {
  // Devuelve todos los registros
  static async findAll() {
    return await connection.query(
      'SELECT id, greet, language FROM regards'
    )
  }

  // Busca un saludo por su ID
  static async findById(id: number) {
    const result = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?', [id]
    )
    return result[0]
  }

  // Crea un nuevo saludo y lo retorna
  static async create(param: Param) {
    const result = await connection.query(
      'INSERT INTO regards (greet, language) VALUES (?, ?)', 
      [param.greet, param.language]
    )

    const insertId = result.insertId
    const newResult = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?', 
      [insertId]
    )

    return newResult[0]
  }

  // Elimina un saludo por su ID
static async deleteById(id: number) {
  const result = await connection.query(
    'DELETE FROM regards WHERE id = ?',
    [id]
  )
  return result.affectedRows > 0
}

// Actualiza un saludo por su ID
static async updateById(id: number, param: Param) {
  const result = await connection.query(
    'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
    [param.greet, param.language, id]
  )

  if (result.affectedRows > 0) {
    const updated = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    )
    return updated[0]
  } else {
    return null
  }
}

}
