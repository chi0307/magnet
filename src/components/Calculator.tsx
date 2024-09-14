import { t } from 'i18next'
import { useState } from 'react'

interface CalculatorProps {
  className?: string
  onDisplayValueChange?: (value: string) => void
}

type Operator = '+' | '-' | '*' | '/'
type CalculatorInputKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '.'

const Calculator = ({
  className = '',
  onDisplayValueChange = (): void => {},
}: CalculatorProps): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<Operator | null>(null)
  const [isOperatorClicked, setIsOperatorClicked] = useState<boolean>(false)

  const handleNumberClick = (input: CalculatorInputKey): void => {
    if (isOperatorClicked) {
      setDisplayValue(input)
      onDisplayValueChange(input)
      setIsOperatorClicked(false)
      return
    }

    if (input === '.' && displayValue.includes('.')) {
      return
    }

    const newValue = displayValue === '0' ? input : displayValue + input
    setDisplayValue(newValue)
    onDisplayValueChange(newValue)
  }

  const handleOperatorClick = (op: Operator): void => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(displayValue))
    } else if (!isOperatorClicked) {
      calculateResult()
    }
    setOperator(op)
    setIsOperatorClicked(true)
  }

  const calculateResult = (): void => {
    if (firstOperand !== null && operator !== null) {
      const current = parseFloat(displayValue)
      let result

      switch (operator) {
        case '+':
          result = firstOperand + current
          break
        case '-':
          result = firstOperand - current
          break
        case '*':
          result = firstOperand * current
          break
        case '/':
          result = firstOperand / current
          break
        default:
          return
      }

      const formattedResult = parseFloat(result.toFixed(2)).toString()

      setDisplayValue(formattedResult)
      onDisplayValueChange(formattedResult)
      setFirstOperand(result)
      setOperator(null)
    }
  }

  const clearDisplay = (): void => {
    onDisplayValueChange('0')
    setDisplayValue('0')
    setFirstOperand(null)
    setOperator(null)
  }

  const handleDelete = (): void => {
    let newValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0'

    if (newValue.endsWith('.')) {
      newValue = newValue.slice(0, -1)
    }

    if (newValue === '' || newValue === '-') {
      newValue = '0'
    }

    setDisplayValue(newValue)
    onDisplayValueChange(newValue)
  }

  const renderButton = (
    label: string,
    onClick: () => void,
    className = ''
  ): JSX.Element => (
    <button
      className={`border-2 border-[#E5E5E5] rounded-full aspect-ratio-1/1 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )

  return (
    <div className={`grid grid-cols-5 gap-2 text-(5 bold-lg) ${className}`}>
      {/* 第一排 */}
      {renderButton('7', () => handleNumberClick('7'))}
      {renderButton('8', () => handleNumberClick('8'))}
      {renderButton('9', () => handleNumberClick('9'))}
      {renderButton(
        '÷',
        () => handleOperatorClick('/'),
        operator === '/' && isOperatorClicked
          ? 'bg-[#FF4B4A] text-white'
          : 'bg-[#FEC700] text-white'
      )}
      {renderButton('AC', clearDisplay, 'bg-[#1DB0F5] text-white')}

      {/* 第二排 */}
      {renderButton('4', () => handleNumberClick('4'))}
      {renderButton('5', () => handleNumberClick('5'))}
      {renderButton('6', () => handleNumberClick('6'))}
      {renderButton(
        '×',
        () => handleOperatorClick('*'),
        operator === '*' && isOperatorClicked
          ? 'bg-[#FF4B4A] text-white'
          : 'bg-[#FEC700] text-white'
      )}
      {renderButton('←', handleDelete, 'bg-[#1DB0F5] text-white')}

      {/* 第三排 */}
      {renderButton('1', () => handleNumberClick('1'))}
      {renderButton('2', () => handleNumberClick('2'))}
      {renderButton('3', () => handleNumberClick('3'))}
      {renderButton(
        '+',
        () => handleOperatorClick('+'),
        operator === '+' && isOperatorClicked
          ? 'bg-[#FF4B4A] text-white'
          : 'bg-[#FEC700] text-white'
      )}
      <button
        className={`border-2 border-[#E5E5E5] rounded-full text-white row-span-2 ${
          operator && !isOperatorClicked ? 'bg-[#FF9E0B]' : 'bg-[#FF4B4A]'
        }`}
        onClick={calculateResult}
      >
        {operator && !isOperatorClicked ? '=' : t('general.save')}
      </button>

      {/* 第四排 */}
      <button
        className='border-2 border-[#E5E5E5] rounded-full col-span-2'
        onClick={() => handleNumberClick('0')}
      >
        0
      </button>
      {renderButton('.', () => handleNumberClick('.'))}
      {renderButton(
        '-',
        () => handleOperatorClick('-'),
        operator === '-' && isOperatorClicked
          ? 'bg-[#FF4B4A] text-white'
          : 'bg-[#FEC700] text-white'
      )}
    </div>
  )
}

export default Calculator
