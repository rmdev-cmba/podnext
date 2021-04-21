import { GetStaticProps } from 'next';
import { type } from 'node:os';

type Episode = {
  id: string;
  title: string;
  members: string;
  // ...
}

type HomeProps = {
  // episodes: Array<Episode>;
  episodes: Episode[];
}

export default function Home(props: HomeProps) {

  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
};

// SSG - Server Side Generation - Este recurso só funciona em produção (build)
// nesta chamada a página é pré montada, já fica pronta esperando a chamada, muito utilizado em api's que não sofre alteração constante em seus dados.
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes') // busca todos os dados disponibilizado por esta consulta
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}


