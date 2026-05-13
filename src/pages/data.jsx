// TODO Próxima aula terminar a funcionalidade de edição:
// Está faltando atualizar, de fato, os dados e alternar para 
// o modo normal

import { useState } from "react"
import { saveItems, getItems, removeItem, updateItem } from "../lib/db.js"

export default function Data() {

    // Guarda a lista de valores digitados.
    // Perceba que o estado é inicializado como um array vazio, pois a lista começa sem nenhum valor.
    const [listaDeValores, setListaDeValores] = useState(getItems())

    // Guarda o valor atual do campo de texto.
    // O estado é inicializado como uma string vazia, pois o campo começa sem nenhum texto.
    const [texto, setTexto] = useState('')

    // Indica se está no modo de edição (padrão = false)
    const [editando, setModoEdicao] = useState(false);

    // Esse é o texto do botão que manipula os dados
    const [textoDoBotao, setTextoDoBotao] = useState("Adicionar");

    // Guarda o id do valor que está sendo editado
    const [idSendoEditado, setIdSendoEditado] = useState(0);

    function atualizaItem(id) {
        // Recupera o valor digitado sem excesso
        // de espaços
        const valor = texto.trim()

        // Se estiver vazio simplesment ignora
        // saindo da função
        if (!valor) {
            return;
        }

        setListaDeValores(updateItem(id, { text: valor }))
    }

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

        // Cria o elemento que vamos armazenar no novo formato
        // "Date.now().toString()" gera o que chamamos de "timestamp"
        // que é a quantidade de segundos desde uma certa data:
        // Isso serve de chave primária
        const novoItem = {
            id: Date.now().toString(),
            text: texto
        }

        // Por conveniência  criamos uma nova lista que será
        // usada tanto para atualizar o banco de dados quanto 
        // para atualizar o estado.
        const novaLista = [...listaDeValores, novoItem];

        // Atualiza o banco de dados com a nova lista de valores
        saveItems(novaLista);

        // Atualiza o estado com a nova lista de valores
        setListaDeValores(novaLista)

        // Depois de adicionar o item à lista, limpamos o campo de texto para que o usuário possa digitar um novo valor.
        setTexto('')
    }

    function updateTheItem(){
        setListaDeValores(updateItem(idSendoEditado, {text: texto}))
        setModoEdicao(false)
        setIdSendoEditado(0)
        setTextoDoBotao("Adicionar")
        setTexto("")
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
                value={textoDoBotao}
                onClick={
                    () => {
                        if (editando) {
                            // Salvar a edição e resetar para false o "editando"
                            updateTheItem();
                        } else {
                            addItem();
                        }
                    }
                }
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
                            (valor) => (
                                <tr key={valor.id}>
                                    <td>{valor.id}</td>
                                    <td>{valor.text}</td>
                                    <td>
                                        <button onClick={() => {
                                            // Para remover um item, chamamos a função removeItem, passando o índice do item a ser removido.
                                            removeItem(valor.id);

                                            // Depois de remover o item do banco de dados, atualizamos o estado para refletir a nova lista de valores.
                                            setListaDeValores(getItems())
                                        }}>X</button>

                                        <button onClick={
                                            () => {
                                                // Informa a GUI que entramos no 
                                                // modo edição
                                                setModoEdicao(true);
                                                setTextoDoBotao("Atualizar")
                                                setTexto(valor.text)
                                                setIdSendoEditado(valor.id)
                                            }
                                        }>✏️</button>
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