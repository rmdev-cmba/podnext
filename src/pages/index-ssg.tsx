
export default function Home(props) {

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
};

// SSG - Server Side Generation - Este recurso só funciona em produção (build)
// nesta chamada as página são pré montada, já fica pronta esperando a chamada, muito utilizado em api's que não sofre alteração 
// constante em seus dados, mas neste formato pode ser produzida muitas página na build o que não é bom.
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}


// Video: [NLW#5] Trilha ReactJS – Aula 02 (1:10:00)