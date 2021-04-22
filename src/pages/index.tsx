import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../service/api';
import { format, parseISO } from 'date-fns';
// parseISO converte uma 'string data' na data correspondente
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from './../utils/convertDurationToTimeString';
import s from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;

}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  // formatação de dados: para melhor performance fazer a formatação fora do return

  return (
    <div className={s.homepage}>
      <section className={s.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>

        <ul>
          {latestEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail} alt={episode.title}
                  objectFit="cover" // ajusta o tamanho da imagem
                />

                <div className={s.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={s.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>

      </section>

    </div>
  )
};

// SSG - Server Side Generation - Este recurso só funciona em produção (build)
// nesta chamada a página é pré montada, já fica pronta esperando a chamada, muito utilizado em api's que não sofre alteração constante em seus dados.
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })  // busca todos os dados disponibilizado por esta consulta

  // fazendo a formatação dos dados retornados
  const episodes = data.map(episode => {
    return {
      id: episode.id, // sem formatação
      title: episode.title, // sem formatação
      thumbnail: episode.thumbnail, // sem formatação
      members: episode.members, // sem formatação
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }), // formatado
      duration: Number(episode.file.duration), // formatado para numero
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description, // sem formatação
      url: episode.file.url // sem formatação
    }
  })

  // após formatação então é chamado no return abaixo
  // gerando dois retornos
  const latestEpisodes = episodes.slice(0, 2); // pega os dois últimos episódios
  const allEpisodes = episodes.slice(2, episodes.length); // pega o restante

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}


