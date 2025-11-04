document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    
    // Если персонажа нет на странице, ничего не делаем
    if (!character) return;

    let charRect = character.getBoundingClientRect();
    let charCenterX = charRect.left + charRect.width / 2;
    let charCenterY = charRect.top + charRect.height / 2;
    
    // Обновляем центр персонажа при изменении размера окна
    window.addEventListener('resize', () => {
        charRect = character.getBoundingClientRect();
        charCenterX = charRect.left + charRect.width / 2;
        charCenterY = charRect.top + charRect.height / 2;
    });

    // Дистанция, на которой персонаж "замечает" мышь
    const activationDistance = 400; // 400 пикселей

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Рассчитываем расстояние от мыши до центра персонажа
        const dist = Math.sqrt(Math.pow(mouseX - charCenterX, 2) + Math.pow(mouseY - charCenterY, 2));

        if (dist < activationDistance) {
            // Мышь близко:
            // 1. Останавливаем "парение"
            character.style.animationPlayState = 'paused';

            // 2. Рассчитываем наклон на основе близости
            const percentX = (mouseX - charCenterX) / activationDistance;
            const percentY = (mouseY - charCenterY) / activationDistance;

            const maxRotateX = 10;
            const maxRotateY = 15;
            
            const rotateX = percentY * maxRotateX * -1; // -1 для инверсии
            const rotateY = percentX * maxRotateY;

            // Применяем 3D-наклон
            character.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            // Мышь далеко:
            // 1. Возобновляем "парение"
            character.style.animationPlayState = 'running';

            // 2. Сбрасываем наклон
            character.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });

    // Плавный возврат в исходное положение, когда мышь уходит со страницы
    document.body.addEventListener('mouseleave', () => {
        character.style.animationPlayState = 'running';
        character.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});