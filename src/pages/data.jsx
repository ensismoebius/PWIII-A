// TODO - Implementar o update do CRUD, explicar o bug em db.js: 
// O banco de dados não estava sedo atualizado.

import { useState } from "react"
import { saveItems, getItems, removeItem } from "../lib/db.js"

export default function Data() {

    // Guarda a lista de valores digitados.
    // Perceba que o estado é inicializado como um array vazio, pois a lista começa sem nenhum valor.
    const [listaDeValores, setListaDeValores] = useState(getItems())

    // Guarda o valor atual do campo de texto.
    // O estado é inicializado como uma string vazia, pois o campo começa sem nenhum texto.
    const [texto, setTexto] = useState('')

    // Boa prática: Sempre que possivel, evite atualizar estados
    //dentro do useEffect, isso pode gerar loop de renderização infinitos.
    // Nesse caso, prefira inicializar diretamente o estado com os
    // dados do banco de dados, como foi feito na linha: 
    //const [listaDeValores, setListaDeValores] = useState(getItems())

    // useEffect(() => {
    //     setListaDeValores(getItems())
    // }, [])

    function addItem() {
        // Para adicionar um item à lista, criamos uma nova lista que contém todos os itens anteriores mais o novo item.
        // Usamos o operador spread (...) para copiar os itens anteriores da lista e adicionamos o novo texto no final.

        // Por conveniência  criamos uma nova lista que será
        // usada tanto para atualizar o banco de dados quanto 
        // para atualizar o estado.
        const novaLista = [...listaDeValores, texto];

        // Atualiza o banco de dados com a nova lista de valores
        saveItems(novaLista);

        // Atualiza o estado com a nova lista de valores
        setListaDeValores(novaLista)

        // Depois de adicionar o item à lista, limpamos o campo de texto para que o usuário possa digitar um novo valor.
        setTexto('')
    }

    return (
        <div>
            <h1>Dados</h1>
            <input
                type="text"
                placeholder="Digite algo..."
                value={texto}
                onChange={
                    (evento) => setTexto(
                        evento.target.value
                    )
                }
            />

            <input
                type="button"
                value="Adicionar"
                onClick={addItem}
            />

            <p>Aqui estão os dados</p>

            <table>
                <thead>
                    <tr>
                        <th>Índice</th>
                        <th>Valor</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // No javascript, toda a lista de
                        // valores tem o método map, esse
                        //  método pode ser usado para 
                        // transformar cada item da lista
                        // em um elemento JSX. Neste 
                        // caso, linhas de uma tabela.
                        listaDeValores.map(
                            // O método map recebe uma função como argumento, essa função é chamada para cada item da lista, e recebe o valor do item e seu índice como parâmetros.
                            (valor, indice) => (
                                <tr key={indice}>
                                    <td>{indice}</td>
                                    <td>{valor}</td>
                                    <td>
                                        <button onClick={() => {
                                            // Para remover um item, chamamos a função removeItem, passando o índice do item a ser removido.
                                            removeItem(indice);

                                            // Depois de remover o item do banco de dados, atualizamos o estado para refletir a nova lista de valores.
                                            setListaDeValores(getItems())
                                        }}>X</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}