import Image from 'next/image';
import { useContext } from 'react';
// importacao do pacote slider para gerar a barra de indicação tempo no player
import Slider from 'rc-slider';
// importando o css próprio do rc-slider
import 'rc-slider/assets/index.css';
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
                        { episode ? (
                            <Slider 
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={s.emptySlider} />
                        ) }
                    </div>
                    <span>00:00</span>
                </div>

                <div className={s.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className={s.playButton} disabled={!episode}>
                        <img src="/play.svg" alt="Tocar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>

        </div>
    );

}