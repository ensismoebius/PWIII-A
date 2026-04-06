import { useState } from "react"

export default function Data() {

    // Guarda a lista de valores digitados.
    // Perceba que o estado é inicializado como um array vazio, pois a lista começa sem nenhum valor.
    const [listaDeValores, setListaDeValores] = useState([])

    // Guarda o valor atual do campo de texto.
    // O estado é inicializado como uma string vazia, pois o campo começa sem nenhum texto.
    const [texto, setTexto] = useState('')

    function addItem() {
        // Para adicionar um item à lista, criamos uma nova lista que contém todos os itens anteriores mais o novo item.
        // Usamos o operador spread (...) para copiar os itens anteriores da lista e adicionamos o novo texto no final.
        setListaDeValores([...listaDeValores, texto])

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

            <p>
                Aqui estão os dados

                <table>
                    <thead>
                        <tr>
                            <th>Índice</th>
                            <th>Valor</th>
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
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>


            </p>
        </div>
    )
}