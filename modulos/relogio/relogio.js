const router = require('express').Router()

const dataBase = require('../../database/relogio')
const modelAgendaOracao = require('../../database/models/agendaOracao')

/// METODOS HTTP
/**
 * GET - retorna dados, nao tem "corpo"
 * POST - envia dados, tem "corpo"
 * PUT - atualizar dados, tem "corpo"
 * DELETE - Apagar dados, nao tem "corpo"
 */

router.get('/relogio', async (req, res) => {

  const relogio = {}
  const records = await modelAgendaOracao.findAll()

  for(let i = 0; i < 24; i ++){
    relogio[i.toString()] = {
     pessoas: []
    }
  }

  for(const record of records){
    console.log(record)
    const hora = record.hora.toString()
    if (relogio[hora]) {
      relogio[hora].pessoas.push({id: record.id, nome: record.nomePessoa}) 
    } 
  }

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
router.post('/relogio/:hora', async (req, res) => {

  const relogio = dataBase.relogio;/// carrega o banco de dados

  const horaParam = Number(req.params.hora)//pega o ID da relogio solicitada 

  const horaRelogio = relogio[horaParam]// verifica na lista de relogio se tem alguma o ID informado no parametro

  if (horaRelogio) {
    const nome = req.body.nome
    const data = {
      nome, 
      id: horaRelogio.pessoas.length + 1
    }

    horaRelogio.pessoas.push(data)
    await modelAgendaOracao.create({
      nomePessoa: nome,
      hora: horaParam
    })
    return res.send(horaRelogio)
  }

  return res.send(`Hora não encontrada para o ID ${horaParam}`)
})

// Remove uma pessoa com base no ID do parametro
router.delete('/relogio/:hora/:id', async (req, res) => {
 

  const horaParam = Number(req.params.hora)//pega o ID da pessoa solicitada 
  const idPessoa = Number(req.params.id)

  if (! Number.isNaN(horaParam)) {
    
   await modelAgendaOracao.destroy({
    where: {
      id: idPessoa, 
      hora: horaParam
    }
 
   }) 
    
    return res.send('Pessoa removida com sucesso')
  }


  return res.send(`Pessoa não encontrada para o ID ${horaParam}`)
})

module.exports = router 