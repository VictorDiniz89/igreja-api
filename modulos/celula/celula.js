const router = require('express').Router()

const { celulas } = require('../../database/data')
const dataBase = require('../../database/data')

router.get('/celula', (req, res) => {
    const celulas = dataBase.celulas

    return res.send(celulas)
})

router.get('/celula/:id', (req, res) => {
    const celulas = dataBase.celulas
    const idCelula = Number(req.params.id)
    const celula = celulas.find(item => item.id === idCelula)

    if(celula){
        return res.send(celula)
    }
    return res.send(`Nenhuma pessoa encontrada para o ID ${idCelula}`)
})

router.post('/celula', (req, res) => {
    const celulas = dataBase.celulas
    const novaCelula = req.body
    novaCelula.id = celulas.length + 1
    celulas.push(novaCelula)
    return res.send(novaCelula)
})

router.put('/celula/:id', (req, res) => {
    const celulas = dataBase.celulas
    const idCelula = Number(req.params.id)
    const celula = celulas.find(item => item.id === idCelula)

    if(celula){
        const novosDados = req.body

        celula.nome = novosDados.nome || celula.nome
        celula.lider = novosDados.lider || celula.lider
        celula.endereco = novosDados.endereco || celula.endereco

        return res.send(celula)
    }

        return res.send(`Nenhuma célula encontrada para o ID ${idCelula}`)
})

router.delete('/celula/:id', (req, res) => {
    const celulas = dataBase.celulas
    const idCelula = Number(req.params.id)
    const celula = celulas.find(item => item.id === idCelula)

    if(celula){
        celulas.splice(celulas.indexOf(celula), 1)
        return res.send('Célula removida com sucesso')
    }
    return res.send(`Nenhuma célula encontrada para o ID ${idCelula}`)
})
module.exports = router