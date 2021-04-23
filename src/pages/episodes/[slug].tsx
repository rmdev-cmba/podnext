import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
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
    return (
        <div className={s.episode}>
            <div className={s.thumbnailContainer}>
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar" />
                </button>
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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
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
        revalidate: 60 * 60 * 24, // 24 hours
    }
}