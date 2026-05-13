import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getItems, addItem, removeItem, updateItem } from '../lib/db'
import './App.css'

function DataPage() {

    // Melhor do que usar useEffect para carregar os dados do localStorage, 
    // é usar o argumento de função do useState, que é executado apenas na 
    // inicialização do componente. Assim, evitamos renderizações desnecessárias.  
    const [items, setItems] = useState(() => getItems())
    const [text, setText] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    function handleAdd(e) {
        e.preventDefault()
        const value = text.trim()
        if (!value) return
        const item = addItem({ text: value })
        setItems(prev => [item, ...prev])
        setText('')
    }

    function handleRemove(id) {
        removeItem(id)
        setItems(prev => prev.filter(i => i.id !== id))
    }

    function handleUpdate(id) {
        const value = editText.trim()
        if (!value) return

        setItems(updateItem(id, { text: value }))
        setEditingId(null)
        setEditText('')
    }

    return (
        <>
            <h1>Dados (localStorage)</h1>
            <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Novo item" />
                <button type="submit">Adicionar</button>
            </form>

            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ marginBottom: 6 }}>
                        {editingId === item.id ? (
                            <>
                                <input value={editText} onChange={e => setEditText(e.target.value)} />
                                <button onClick={() => handleUpdate(item.id)}>Salvar</button>
                  q              <button onClick={() => setEditingId(null)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                {item.text}{' '}
                                <button onClick={() => { setEditingId(item.id); setEditText(item.text) }}>Editar</button>
                                <button onClick={() => handleRemove(item.id)}>Remover</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <p>
                <Link to="/">Voltar para Início</Link>
            </p>
        </>
    )
}

export default DataPage
