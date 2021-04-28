import '../styles/global.scss';
import { Header } from '../components/Header';
import { Player } from './../components/Player/index';
import s from '../styles/app.module.scss';
import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={s.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp

