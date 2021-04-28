import { createContext, ReactNode, useState } from 'react';


// tipando o objeto que será carregado PlayerContext
type Episode = {
    // aqui será tipado apenas o será mostrado durante o play
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number; // índice para apontar em qual posição do array está tocando atualmente
    isPlaying: boolean;
    play: (episode: Episode) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playList: (list: Episode[], index: number) => void;
}

export const PlayerContext = createContext({} as PlayerContextData); // os parâmetros aqui não é o que será carregado aos componentes, mas informa com quais tipos de parâmetros será trablhado, recebidos
// está sendo informado que trablhará com objetos com a tipagem informada

// tipagem para o código abaixo:
type PlayerContextProviderProps = {
    children: ReactNode; // ReactNode é um type para defenir que recebe qualquer relativo ao React
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    // criando uma função para mudar os dado de episodeList
    const [episodeList, setEpisodeList] = useState([]); // esta variável será repassado no objeto PlayerContext.Provider
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0); // esta variável será repassado no objeto PlayerContext.Provider
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode: Episode) { // tipado como um objeto e não um array
        setEpisodeList([episode]); // 'episode' aqui é um objeto que está sendo passado como array por isso dentro dos '[]'
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list); // 'list' aqui já é um array, não precisa colocar dentro de '[]'
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    // funcção pause/play quando clica no botão
    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    // função para pause/play no teclado
    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                togglePlay,
                setPlayingState,
                playList,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

