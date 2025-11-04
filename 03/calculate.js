function calculate() {
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const resultDiv = document.getElementById('result');
    
    // Проверка на ввод чисел
    if (isNaN(x) || isNaN(y)) {
        resultDiv.textContent = 'Ошибка: введите числа для X и Y';
        document.getElementById('resultData').value = 'Ошибка: введите числа';
        return;
    }
    
    // Проверка деления на ноль
    if (x === 0 || y === 0) {
        resultDiv.textContent = 'Ошибка: X и Y не должны быть 0';
        document.getElementById('resultData').value = 'Ошибка: X и Y не должны быть 0';
        return;
    }
    
    // Вычисление результата
    const z = 1 / (x * y);
    const resultText = 'Z = 1/(' + x + '*' + y + ') = ' + z;
    
    // Вывод результата в окошко
    resultDiv.textContent = resultText;
    
    // Сохраняем результат в скрытое поле формы
    document.getElementById('resultData').value = resultText;
}