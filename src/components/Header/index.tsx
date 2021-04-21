import s from './style.module.scss';

export function Header(){
    
    return(
        <header className={s.container}>
            <img src="/logo.svg" alt="Podcastr" />

            <p>O melhor pra você ouvir, sempre</p>

            <span>qua, 21 abril</span>
            
        </header>
    )

}