export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / 3600); // 'Math.floor' arredonda para um menor número inteiro
    const minutes = Math.floor((duration % 3600) / 60); // recebe o resto da divisão anterior e divide por 60
    const seconds = duration % 60; // pega o resto da divisao anterior

    // criando a string que contém hora, minuto e segundo '00:00:00'
    const timeString = [hours, minutes, seconds]
        // caso os dados retorne com um dígito será acrescido antes o dígito '0'
        .map(unit => String(unit).padStart(2, '0')) // percorre cada item do array e converte em string e a função padStart detecta se tem 2 dígitos, se não acrescenta a frente (Start) o dígito '0'
        .join(':');

        return timeString;
}