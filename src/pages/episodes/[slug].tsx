import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../service/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import s from './episode.module.scss';

type Episode = {
    id: string;
    title: string;
    members: string;
    thumbnail: string;
    publishedAt: string;
    duration: number;
    durationAsString: string;
    url: string;
    description: string;
};

type EpisodeProps = {
    episode: Episode; // tipado que recebe um objeto
};

export default function Episode({ episode }: EpisodeProps) {
    
    // código que serve somente se o 'fallback' for true
    const router = useRouter();
    if (router.isFallback) {
        return <p>Carregando</p>
    }
    // fim código 'fallback'

    return (
        <div className={s.episode}>
            <div className={s.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        {/* botão para voltar a página home  - coloca-se em volta do 'Link'*/}
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio" />
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            {/* se usar o código abaixo por segurança do react a descrição apresentada que veio com tags html não será convertido em 'html' */}
            {/* <div className={s.description}>
                    {episode.description}
                </div> */}

            {/* para a descrição ser formatada para html tem que fazer o código abaixo numa 'div' sem 'corpo' */}
            <div
                className={s.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />

        </div>
    )
}

// o método abaixo se usa em toda rota que contém '[]' - dinâmica e em toda página estática dinâmica ISR
export const getStaticPaths: GetStaticPaths = async () => {
    // https://www.youtube.com/watch?v=cRs3jdGbOt0
    // definindo umas páginas estáticas iniciais para acesso mais rápido
    const { data } = await api.get('episodes', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc'
        }
    })  // busca todos os dados disponibilizado em '_limit'

    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id // estas páginas serão montadas em build
            }
        }
    })

    return {
        paths: paths, // basta escrever paths se quiser

        fallback: 'blocking' // false - não permite produzir páginas não determinadas em path, 
        // true - permite produzir qualquer página, mas é produzido pelo lado client-browser (tem que usar useRouter)
        // 'blocking' - permite produzir qualquer página e é fabricado no next que só entrega ao cliente quando estiver pronto, mas não apresenta erro enquanto produz
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;

    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id, // sem formatação
        title: data.title, // sem formatação
        thumbnail: data.thumbnail, // sem formatação
        members: data.members, // sem formatação
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }), // formatado
        duration: Number(data.file.duration), // formatado para numero
        durationAsString: convertDurationToTimeString(Number(data.file.duration)), // convertido para string a partir de uma data em formato número
        description: data.description, // sem formatação
        url: data.file.url
    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, // 24 hours, após este tempo todas ás paginas estáticas produzidas no build ou depois serão atualizadas automaticamente,
                                  // não atualiza antes
    }
}