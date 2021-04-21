import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import s from './Header.module.scss';

export function Header(){
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });
    
    return(
        <header className={s.container}>
            <img src="/logo.svg" alt="Podcastr" />

            <p>O melhor pra você ouvir, sempre</p>

            <span>{currentDate}</span>
            
        </header>
    )

}