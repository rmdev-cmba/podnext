import { useEffect } from "react"

export default function Home() {
  // uma página SPA, mas que depende do javascript ativado no Browser
  useEffect(()=>{
      fetch('http://localhost:3333/episodes')
        .then(response => response.json()) // retorna a resposta já convertida em json
        .then(data => console.log(data)) // pega 'data', onde contém os dados, que vem embutido no response e mostra no console do browser
  }, [])// passando o array vazio o useEffect só será chamado uma vez, assim que a página for chamada.
  return (
    
    <h1>Index</h1>
    
  )
};

// este modelo de chamada só carrega os dados no momento da chamada.
// os hooks do React só pode ser usado dentro de componentes

