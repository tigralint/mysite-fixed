document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.character');
    
    // Убедимся, что персонаж есть на странице (т.е. мы на главной)
    if (!character) return;

    document.addEventListener('mousemove', (e) => {
        // Рассчитываем позицию мыши от -1 до 1 (от центра экрана)
        const percentX = (e.clientX / window.innerWidth - 0.5) * 2;
        const percentY = (e.clientY / window.innerHeight - 0.5) * 2;

        // Максимальный наклон (в градусах)
        const maxRotateX = 8;  // Наклон по оси Y
        const maxRotateY = 12; // Наклон по оси X
        
        const rotateX = percentY * maxRotateX * -1; // -1, чтобы наклон был "от мыши"
        const rotateY = percentX * maxRotateY;

        // Применяем 3D-трансформацию для создания эффекта "наклона"
        character.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Сбрасываем наклон, когда мышь уходит со страницы
    document.body.addEventListener('mouseleave', () => {
        character.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});