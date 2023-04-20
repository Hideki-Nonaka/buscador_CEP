/** @format */

import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import "./App.css"
import api from "./services/api"

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch(event) {
    event.preventDefault() // previne o comportamento padrão do formulário
    if (input === "") {
      alert("Preencha algum CEP !")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("OPS erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <form onSubmit={handleSearch}>
        <div className="containerInput">
          <input
            type="text"
            placeholder="Digite seu CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" className="botao">
            <FiSearch size={25} color="#000" />
          </button>
        </div>
      </form>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Bairro: {cep.bairro}</span>
          <span>Localidade: {cep.localidade}</span>
          <span>Logradouro: {cep.logradouro}</span>
          <span>UF: {cep.uf}</span>
        </main>
      )}
    </div>
  )
}

export default App
