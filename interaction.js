document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    
    // Если персонажа нет ИЛИ экран слишком узкий (мобильный), ничего не делаем
    if (!character || window.innerWidth < 800) return;

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
            character.style.animationPlayState = 'paused';

            const percentX = (mouseX - charCenterX) / activationDistance;
            const percentY = (mouseY - charCenterY) / activationDistance;

            const maxRotateX = 10;
            const maxRotateY = 15;
            
            const rotateX = percentY * maxRotateX * -1;
            const rotateY = percentX * maxRotateY;

            character.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            // Мышь далеко:
            character.style.animationPlayState = 'running';
            character.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });

    document.body.addEventListener('mouseleave', () => {
        character.style.animationPlayState = 'running';
        character.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});