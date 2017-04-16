require(['./clients','./funcao'], function(colecao, minhaFuncao){
    console.log(colecao);
    console.log(minhaFuncao(10,20));
    console.log(require('./variavel'));
});