import '../styles/global.scss';
import { useState } from 'react';
import { Header } from '../components/Header';
import { PlayerContext } from '../contexts/PlayerContext';
import { Player } from './../components/Player/index';

import s from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  // criando uma função para mudar os dado de episodeList
  const [episodeList, setEpisodeList]= useState([]); // esta variável será repassado no objeto PlayerContext.Provider
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0); // esta variável será repassado no objeto PlayerContext.Provider

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}> 
      <div className={s.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )

}

export default MyApp
