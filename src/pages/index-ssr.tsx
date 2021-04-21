
export default function Home(props) {

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
};

// SSR - Server Side Render
// nesta chamada a página é pré-redenrizada no servidor e não depende do javascript do browser, mas é montada toda vez que for chamada
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}


