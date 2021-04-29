import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// importacao do pacote slider para gerar a barra de indicação tempo no player
import Slider from 'rc-slider';
// importando o css próprio do rc-slider
import 'rc-slider/assets/index.css';
import s from './Player.module.scss';
import { usePlayer } from './../../contexts/PlayerContext';
import { convertDurationToTimeString } from './../../utils/convertDurationToTimeString';

export function Player() {
    // criando uma referencia para controlar a tag audio do html
    const audioRef = useRef<HTMLAudioElement>(null); // usa-se 'useRef' do react tipando com HTMLAudioElement com valor inicial null

    const [progress, setProgress] = useState(0); // Memória para guardar dados da 'barra de progresso' (Slider) ref tempo do áudio

    // funcao useContext para fazer algo funcionar em varios componentes distintos
    const { episodeList, currentEpisodeIndex, isPlaying, hasNext, hasPrevious, isLooping, isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        clearPlayerState,
    } = usePlayer();

    // após ativado o audioRef será criado useEffet para ele fazer a mudança assim que algo mudar no audio
    useEffect(() => {
        if (!audioRef.current) { // os dados não fica em audioRef e sim em 'current' que vem do useRef do react
            return; // se não tem dados então não executa nada
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]); // toda vez que 'isPlaying' for alterado

    // função para monitorar o tempo do áudio
    function setupProgresssListener() {
        audioRef.current.currentTime = 0; // zera o tempo toda vez que é chamado um novo áudio

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime)); // faz o arredondamento
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount; // altera o ponto do áudio
        setProgress(amount); // altera o ponto da barra(Slider)
    }

    function episodeEnded(){
        if (hasNext) {
            playNext()
        }else{
            clearPlayerState()
        }
    }
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
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={s.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration} // max em segundos
                                value={progress}
                                onChange={handleSeek} // chama a função levando o parâmetro internamente e muda a barra manualmente
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={s.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>
                {/* se usa '&&' pois este if não contém o senão (else), usa-se '||' para fazer ao contrário */}
                {episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onEnded={episodeEnded} //quando o áudio chega no final e repeat não estiver ativado
                        loop={isLooping} // função repeat
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedData={setupProgresssListener} // esse método dispara assim que carregar os dados do episódio
                    />
                )}

                <div className={s.buttons}>
                    <button type="button"
                        className={isShuffling ? s.isActive : ''}
                        disabled={!episode || episodeList.length === 1} // só funciona se conter mais de 1 espisódio
                        onClick={toggleShuffle}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>

                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>

                    <button type="button" className={s.playButton} disabled={!episode} onClick={togglePlay}>
                        {isPlaying
                            ? <img src="/pause.svg" alt="Pause" />
                            : <img src="/play.svg" alt="Tocar" />}
                    </button>

                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>

                    <button
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? s.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    );
}

// https://www.youtube.com/watch?v=cRs3jdGbOt0

// TODO: Implantacao do shuffle [NLW 5] Trilha React - Aula 05 (00:42:00)