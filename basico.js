/*Crie um objeto que tenha as propriedades: id, descricao, fabricante, valorTotal, 
cores (este eh um array que deve ter as cores, vermelho, branco e cinza), equipamentos (este eh um array de objetos, 
que deve ter 3 objetos, cada objeto deve ter uma propriedade id, 
e uma descricao, as descricoes serao: "controle remoto", "fonte 240v bivolt", "Fone de ouvido") */

const obj = {
    id: 1,
    descricao: '',
    fabricante: '',
    valorTotal: 0,
    cores: ['vermelho', 'branco', 'cinza'],
    equipamentos: [
         {
            id: 1,
            descricao: "controle remoto",
        },

        {
        id: 2,
        descricao: "fonte 240v bivolt",
       },

       {
        id: 3,
        descricao: "Fone de ouvido",
       }
    ]
}



// fazer um log para a quantidade equipamentos 
// pesquisar um table html para o react
// cd.. para ir voltando ao diretorio
// cd api para entrar no diretorio
// node .\basico.js

console.log(`${obj.equipamentos.length}`)