
export default function Home(props) {

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
};

// SSG - Server Side Generation - Este recurso só funciona em produção (build)
// nesta chamada a página é pré montada, já fica pronta esperando a chamada, muito utilizado em api's que não sofre alteração constante em seus dados.
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


