import { useState } from "react"

export default function Data() {

    // Guarda a lista de valores digitados.
    // Perceba que o estado é inicializado como um array vazio, pois a lista começa sem nenhum valor.
    const [listaDeValores, setListaDeValores] = useState([])

    // Guarda o valor atual do campo de texto.
    // O estado é inicializado como uma string vazia, pois o campo começa sem nenhum texto.
    const [texto, setTexto] = useState('')

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
                value="Adicionar" />

            <p>
                Aqui estão os dados
            </p>
        </div>
    )
}