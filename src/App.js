import React, { useState, useEffect } from "react"
import api from './services/api'

import "./styles.css"

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => setRepos(res.data)).catch(err => console.error(err))
  }, [])


  async function handleAddRepository() {
    try {
      const res = await api.post('repositories', {
        "title": `Novo repositório ${Date.now()}`,
        "url": `http://github.com/${Date.now()}`,
        "techs": ["Node.js", "..."]
      })

      setRepos([...repos, res.data])
    } catch (err) {
      console.error(err)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      setRepos(repos.filter(v => v.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(repos => {
            return (
              <li key={repos.id}>
                {repos.title}
                <button onClick={() => handleRemoveRepository(repos.id)}>Remover</button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
