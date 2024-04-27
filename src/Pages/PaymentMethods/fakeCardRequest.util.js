function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const delayInSeconds = getRandomDelay(2, 5); // Получаем случайное число от 2 до 5
console.log(`Сообщение будет выведено через ${delayInSeconds} секунд(ы).`);


export default function fakeCardRequest(callback) {
    setTimeout(callback, delayInSeconds * 1000); 
}