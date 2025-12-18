export class Calculator {
    constructor() {
        this.currentInput = '0';
        this.shouldResetDisplay = false;
    }

    getDisplay() {
        return this.currentInput;
    }

    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentInput === '0') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }
    }

    appendDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }

    appendOperator(operator) {
        if (this.shouldResetDisplay) {
            this.shouldResetDisplay = false;
        }

        const lastChar = this.currentInput[this.currentInput.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar)) {
            this.currentInput = this.currentInput.slice(0, -1) + operator;
        } else {
            this.currentInput += operator;
        }
    }

    calculate() {
        try {
            // Заменяем × на * для вычисления
            let expression = this.currentInput.replace(/×/g, '*');

            // Проверяем на деление на ноль
            if (expression.includes('/0') && !expression.includes('/0.')) {
                this.currentInput = 'Ошибка';
                this.shouldResetDisplay = true;
                return;
            }

            // Используем тот же подход, что и в HTML-версии
            // eslint-disable-next-line no-new-func
            const result = Function('"use strict"; return (' + expression + ')')();

            if (isNaN(result) || !isFinite(result)) {
                this.currentInput = 'Ошибка';
            } else {
                this.currentInput = result.toString();
            }

            this.shouldResetDisplay = true;
        } catch (error) {
            this.currentInput = 'Ошибка';
            this.shouldResetDisplay = true;
        }
    }

    clearDisplay() {
        this.currentInput = '0';
        this.shouldResetDisplay = false;
    }

    deleteLast() {
        if (this.shouldResetDisplay) {
            this.clearDisplay();
            return;
        }

        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }
}


