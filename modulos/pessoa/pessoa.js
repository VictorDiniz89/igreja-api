const router = require('express').Router()

const dataBase = require('../../database/data')

/// METODOS HTTP
/**
 * GET - retorna dados, nao tem "corpo"
 * POST - envia dados, tem "corpo"
 * PUT - atualizar dados, tem "corpo"
 * DELETE - Apagar dados, nao tem "corpo"
 */

router.get('/pessoa', (req, res) => {

  const pessoas = dataBase.pessoas;

  return res.send(pessoas)
})

/// mesma rota "GET" mas com um "parametro" ID
/// tudo que possuir ": (dois pontos)" na rota é uma parametro,
/// e se acessa com "req.params.NOME_PARAMENTO"
router.get('/pessoa/:id', (req, res) => {

  const pessoas = dataBase.pessoas;/// carrega o banco de dados

  const idPessoa = Number(req.params.id)//pega o ID da pessoa solicitada 

  const pessoa = pessoas.find( item => item.id === idPessoa)// verifica na lista de pessoas se tem alguma o ID informado no parametro

  if (pessoa) {
    return res.send(pessoa)
  }

  return res.send(`Nenhuma pessoa encontrada para o ID ${idPessoa}`)
})

// Inclui uma nova pessoa em nosso banco
router.post('/pessoa', (req, res) => {

  const pessoas = dataBase.pessoas;
  
  const novaPessoa = req.body;
  novaPessoa.id = pessoas.length + 1;

  pessoas.push(novaPessoa)

  return res.send(novaPessoa)

})

// Atualiza os dados de uma pessoa
router.put('/pessoa/:id', (req, res) => {
  const pessoas = dataBase.pessoas;/// carrega o banco de dados

  const idPessoa = Number(req.params.id)//pega o ID da pessoa solicitada 

  const pessoa = pessoas.find( item => item.id === idPessoa)// verifica na lista de pessoas se tem alguma o ID informado no parametro

  if (pessoa) {
    
    const novosDados = req.body;

    pessoa.nome = novosDados.nome || pessoa.nome;
    pessoa.nascimento = novosDados.nascimento || pessoa.nascimento;
    pessoa.sexo = novosDados.sexo || pessoa.sexo;
    
    
    return res.send(pessoa)
  }

  return res.send(`Nenhuma pessoa encontrada para o ID ${idPessoa}`)  
})
 
// Remove uma pessoa com base no ID do parametro
router.delete('/pessoa/:id', (req, res) => {
  const pessoas = dataBase.pessoas;/// carrega o banco de dados

  const idPessoa = Number(req.params.id)//pega o ID da pessoa solicitada 

  const pessoa = pessoas.find( item => item.id === idPessoa)// verifica na lista de pessoas se tem alguma o ID informado no parametro

  if (pessoa) {
    
    pessoas.splice( pessoas.indexOf(pessoa), 1 )    
    
    return res.send('Pessoa removida com sucesso')
  }

  return res.send(`Nenhuma pessoa encontrada para o ID ${idPessoa}`)
})

module.exports = router 