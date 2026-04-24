
// STORAGE_KEY identifica um local dentro 
// do localStorage onde os dados serão 
// armazenados. Perceba que aqui temos 
// apenas uma entidade, os itens, 
// então se quisermos armazenar outros 
// tipos de dados,como usuários, pedidos, 
// etc, podemos usar chaves diferentes 
// como 'pwiii-users', 'pwiii-orders', etc.  
const STORAGE_KEY = 'pwiii-items';

export function getItems() {

    try {

        // O localStorage é um objeto global do navegador que permite armazenar dados de forma persistente.
        // Ele tem o método getItem, que recebe uma chave como argumento e retorna o valor associado a essa chave.
        // Se a chave não existir, ele retorna null.
        const items = localStorage.getItem(STORAGE_KEY);

        // O JSON.parse é usado para converter a string armazenada no localStorage de volta para um array de objetos JavaScript.
        // Se items for null (ou seja, se não houver dados armazenados), retornamos um array vazio para evitar erros.
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error('Erro ao obter itens do localStorage:', error);
        return [];
    }
}

export function saveItems(items) {

    try {
        // O localStorage tem o método setItem, que recebe uma chave e um valor como argumentos e armazena esse valor associado à chave.
        // O JSON.stringify é usado para converter o array de objetos JavaScript em uma string, pois o localStorage só pode armazenar strings.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Erro ao salvar itens no localStorage:', error);
    }
}

export function removeItem(id) {

    try {
        // Para remover um item, primeiro obtemos a lista atual de
        //  itens, filtramos para remover o item com o id especificado 
        // e depois salvamos a nova lista de volta no localStorage.

        // TODO - Explicar o bug: O banco de dados não estava sendo atualizado
        // Pois o objeto não tinha a propriedade id, então para remover um item,

        // Este objetos NÃO tem a propriedade id, então para remover um item, 
        // precisamos usar o índice do item na lista.
        // const items = getItems().filter(item => item.id !== id);

        // O método filter cria um novo array com todos os elementos que 
        // passam no teste implementado pela função fornecida. Neste caso, 
        // estamos criando um novo array que inclui todos os itens, exceto 
        // aquele cujo índice é igual ao id fornecido.
        const items = getItems().filter((item, index) => index !== id);

        saveItems(items);
    } catch (error) {
        console.error('Erro ao remover item do localStorage:', error);
    }
}