import {createContext} from 'react';

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
    play: (episode: Episode) => void;
}
export const PlayerContext = createContext({} as PlayerContextData); // os parâmetros aqui não é o que será carregado aos componentes, mas informa com quais tipos de parâmetros será trablhado, recebidos
// está sendo informado que trablhará com objetos com a tipagem informada

