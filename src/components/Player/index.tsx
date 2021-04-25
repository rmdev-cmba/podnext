import Image from 'next/image';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import s from './Player.module.scss';

export function Player() {
    // funcao useContext para fazer algo funcionar em varios componentes distintos
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)

    // buscando o episode que será tocado
    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={s.container}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora {episode?.title}</strong>
            </header>

            { episode ? (
                <div className={s.currentEpisode}>
                    <Image
                     width={592}
                     height={592}
                     src={episode.thumbnail}
                     objectFit="cover"
                     />
                     <strong>{episode.title}</strong>
                     <span>{episode.members}</span>

                </div>
            ) : (
                <div className={s.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}



            <footer className={!episode ? s.empty : ''}> {/* '!episode ? x ; y' se não houver episódio então x senão y*/}
                <div className={s.progress}>
                    <span>00:00</span>
                    <div className={s.slider}>
                        <div className={s.emptySlider} />
                    </div>
                    <span>00:00</span>
                </div>
                <div className={s.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={s.playButton}>
                        <img src="/play.svg" alt="Tocar" />
                    </button>
                    <button type="button" >
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type="button" >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>

        </div>
    );

}