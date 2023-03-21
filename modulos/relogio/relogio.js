const router = require('express').Router()

const dataBase = require('../../database/relogio')

/// METODOS HTTP
/**
 * GET - retorna dados, nao tem "corpo"
 * POST - envia dados, tem "corpo"
 * PUT - atualizar dados, tem "corpo"
 * DELETE - Apagar dados, nao tem "corpo"
 */

router.get('/relogio', (req, res) => {

  const relogio = dataBase.relogio;

  return res.send(relogio)
})

/// mesma rota "GET" mas com um "parametro" ID
/// tudo que possuir ": (dois pontos)" na rota é uma parametro,
/// e se acessa com "req.params.NOME_PARAMENTO"
router.get('/relogio/:hora', (req, res) => {

  const relogio = dataBase.relogio;/// carrega o banco de dados

  const horaParam = Number(req.params.hora)//pega o ID da relogio solicitada 

  const horaRelogio = relogio[horaParam]// verifica na lista de relogio se tem alguma o ID informado no parametro

  if (horaRelogio) {
    return res.send(horaRelogio)
  }

  return res.send(`Nenhuma pessoa encontrada para o ID ${horaParam}`)
})

// Inclui uma nova pessoa em nosso banco
router.post('/relogio/:hora', (req, res) => {

  const relogio = dataBase.relogio;/// carrega o banco de dados

  const horaParam = Number(req.params.hora)//pega o ID da relogio solicitada 

  const horaRelogio = relogio[horaParam]// verifica na lista de relogio se tem alguma o ID informado no parametro

  if (horaRelogio) {
    const nome = req.body.nome
    horaRelogio.pessoas.push({
      nome, 
      id: horaRelogio.pessoas.length + 1
    })
    return res.send(horaRelogio)
  }

  return res.send(`Hora não encontrada para o ID ${horaParam}`)
})

// Remove uma pessoa com base no ID do parametro
router.delete('/relogio/:hora/:id', (req, res) => {
  const relogio = dataBase.relogio;/// carrega o banco de dados

  const horaParam = Number(req.params.hora)//pega o ID da pessoa solicitada 
  const idPessoa = Number(req.params.id)
  const horaRelogio = relogio[horaParam]// verifica na lista de pessoas se tem alguma o ID informado no parametro

  if (horaRelogio) {
    const pessoa = horaRelogio.pessoas.find(item => item.id === idPessoa)
    if(pessoa)
      horaRelogio.pessoas.splice( horaRelogio.pessoas.indexOf(pessoa), 1 )    
    
    return res.send('Pessoa removida com sucesso')
  }

  return res.send(`Pessoa não encontrada para o ID ${horaParam}`)
})

module.exports = router 