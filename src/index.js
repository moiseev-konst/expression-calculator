function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if (expr.match(/(\/\s?0)/)) {
        throw "TypeError: Division by zero."
    }
    return calc(expr)

    function calc(expr) {
        let arrayExpr = expr.match(/(\d+|\S)/g)
        const functionOperand = {
            '+': (a, b) => { return a + b },
            '-': (a, b) => { return b - a },
            '*': (a, b) => { return a * b },
            '/': (a, b) => { return b / a }
        }
        const priority = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '(': 0,
            ')': 0
        }
        let reversePolishNotation = []
        let operands = []
        let stack = []

        function outputOperands(el) {
            while (operands.length !== 0 && operands[operands.length - 1] !== '(' && priority[operands[operands.length - 1]] >= priority[el]) {
                reversePolishNotation.push(operands.pop())
            }
            if (operands[operands.length - 1] == '(' && el == ')') {
                return operands.pop()
            } else { addOperand(el) }
        }

        function isPriority(el) {
            return priority[el] > priority[operands[operands.length - 1]] || operands[operands.length - 1] == '(' || operands.length == 0 ? true : false
        }

        function addOperand(oper) {
            operands.push(oper)
        }
        arrayExpr.forEach(element => {
            if (Number(element) || element == '0') {
                reversePolishNotation.push(element)
            }
            if (!Number(element)) {
                switch (element) {
                    case '+':
                        return isPriority(element) ? addOperand(element) : outputOperands(element)
                    case '-':
                        return isPriority(element) ? addOperand(element) : outputOperands(element)
                    case '*':
                        return isPriority(element) ? addOperand(element) : outputOperands(element)
                    case '/':
                        return isPriority(element) ? addOperand(element) : outputOperands(element)
                    case '(':
                        return addOperand(element)
                    case ')':
                        return outputOperands(element)
                }
            }
        });
        while (operands.length > 0) {
            reversePolishNotation.push(operands.pop())
        }
        if (reversePolishNotation.indexOf('(') > 0 || reversePolishNotation.indexOf(')') > 0) {
            throw "ExpressionError: Brackets must be paired"
        }
        for (let i = 0; i < reversePolishNotation.length; i++) {
            if (Number(reversePolishNotation[i]) || reversePolishNotation[i] == '0') {
                stack.push(Number(reversePolishNotation[i]))
            } else {
                stack.push(Number(functionOperand[reversePolishNotation[i]](stack.pop(), stack.pop())))
            }
        }
        return stack[0]
    }
}


module.exports = {
    expressionCalculator
}