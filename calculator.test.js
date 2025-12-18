import { describe, it, expect } from 'vitest';
import { Calculator } from './calculator';

describe('Calculator', () => {
    it('должен инициализироваться с нулём', () => {
        const calc = new Calculator();
        expect(calc.getDisplay()).toBe('0');
    });

    it('должен добавлять цифры к текущему вводу', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        expect(calc.getDisplay()).toBe('5');

        calc.appendNumber('3');
        expect(calc.getDisplay()).toBe('53');
    });

    it('должен корректно работать флаг сброса дисплея при вводе числа', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        calc.appendOperator('+');
        calc.appendNumber('3');
        calc.calculate();

        // после вычисления следующий ввод числа должен начать новое выражение
        calc.appendNumber('7');
        expect(calc.getDisplay()).toBe('7');
    });

    it('должен добавлять десятичную точку только один раз', () => {
        const calc = new Calculator();
        calc.appendNumber('1');
        calc.appendDecimal();
        calc.appendNumber('5');
        calc.appendDecimal(); // не должно добавиться
        expect(calc.getDisplay()).toBe('1.5');
    });

    it('должен добавлять оператор и заменять последний оператор при необходимости', () => {
        const calc = new Calculator();
        calc.appendNumber('8');
        calc.appendOperator('+');
        expect(calc.getDisplay()).toBe('8+');

        // заменяем оператор
        calc.appendOperator('-');
        expect(calc.getDisplay()).toBe('8-');
    });

    it('должен корректно считать простые выражения (сложение, вычитание, умножение, деление)', () => {
        const calc = new Calculator();

        calc.appendNumber('2');
        calc.appendOperator('+');
        calc.appendNumber('3');
        calc.calculate();
        expect(calc.getDisplay()).toBe('5');

        calc.clearDisplay();
        calc.appendNumber('5');
        calc.appendOperator('-');
        calc.appendNumber('2');
        calc.calculate();
        expect(calc.getDisplay()).toBe('3');

        calc.clearDisplay();
        calc.appendNumber('4');
        calc.appendOperator('*');
        calc.appendNumber('3');
        calc.calculate();
        expect(calc.getDisplay()).toBe('12');

        calc.clearDisplay();
        calc.appendNumber('8');
        calc.appendOperator('/');
        calc.appendNumber('2');
        calc.calculate();
        expect(calc.getDisplay()).toBe('4');
    });

    it('должен обрабатывать деление на ноль как ошибку', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        calc.appendOperator('/');
        calc.appendNumber('0');
        calc.calculate();

        expect(calc.getDisplay()).toBe('Ошибка');
    });

    it('должен отличать деление на ноль от деления на число с десятичной частью', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        calc.appendOperator('/');
        calc.appendNumber('0');
        calc.appendDecimal();
        calc.appendNumber('5'); // 0.5
        calc.calculate();

        expect(calc.getDisplay()).toBe('10');
    });

    it('должен возвращать ошибку при некорректном выражении', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        calc.appendOperator('+');
        calc.appendOperator('*'); // выражение "5*"
        calc.calculate();

        expect(calc.getDisplay()).toBe('Ошибка');
    });

    it('должен очищать дисплей', () => {
        const calc = new Calculator();
        calc.appendNumber('9');
        calc.appendOperator('-');
        calc.appendNumber('4');
        expect(calc.getDisplay()).toBe('9-4');

        calc.clearDisplay();
        expect(calc.getDisplay()).toBe('0');
    });

    it('должен удалять последний символ, а при одном символе сбрасывать на 0', () => {
        const calc = new Calculator();
        calc.appendNumber('9');
        calc.appendNumber('8');
        calc.deleteLast();
        expect(calc.getDisplay()).toBe('9');

        calc.deleteLast();
        expect(calc.getDisplay()).toBe('0');
    });

    it('после ошибки deleteLast должен сбрасывать дисплей', () => {
        const calc = new Calculator();
        calc.appendNumber('5');
        calc.appendOperator('/');
        calc.appendNumber('0');
        calc.calculate(); // Ошибка
        expect(calc.getDisplay()).toBe('Ошибка');

        calc.deleteLast();
        expect(calc.getDisplay()).toBe('0');
    });
});


