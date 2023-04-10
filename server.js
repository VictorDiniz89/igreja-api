const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const dotenv = require('dotenv')
const env = process.env.NODE_ENV || 'production';

if (dotenv.config({
    path: `env/${env}.env`
  }).error) {
  throw new Error(`Verifique se existe o arquivo .env do ambiente nas pasta env`);
}

/// configuracao para converter o body para JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const pessoaRota = require('./modulos/pessoa/pessoa')
const celulaRota  = require('./modulos/celula/celula')
const relogioRota = require('./modulos/relogio/relogio')
// Caminho "padrao", da sua API, se nenhuma rota "/" for informada a requisicao cai aqui
app.get('/', (req, res) => {
  res.send('Ola a API está rodando normalmente!')
})

// status da aplicaco
app.get('/health', (req, res) => {
  res.send('API HEALTH IS OK!')
})

/// rotas que voce deseja "mapear" na sua API, importe mais acima suas rotas
app.use(pessoaRota)
app.use(celulaRota)
app.use(relogioRota)

// Faz o servidor "rodar" na porta informada no comeco do arquivo
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})