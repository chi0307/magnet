import Chart, { type ChartType } from 'chart.js/auto'
import { useEffect, useRef } from 'react'

interface DoughnutPieChartProps {
  totalExpense: number
  totalIncome: number
  type?: ChartType
  className?: string
}

const DoughnutPieChart = ({
  totalExpense,
  totalIncome,
  type = 'doughnut',
  className = '',
}: DoughnutPieChartProps): JSX.Element => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')
    if (!ctx) return

    const data = {
      labels: ['Expense', 'Income'],
      datasets: [
        {
          data: [totalExpense, totalIncome],
          backgroundColor: ['#FF4B4A', '#1BB0F6'],
          hoverOffset: 4,
        },
      ],
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data = data
      chartInstanceRef.current.update()
    } else {
      chartInstanceRef.current = new Chart(ctx, {
        type,
        data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          interaction: {
            intersect: false,
          },
          events: [],
        },
      })
    }

    // Cleanup function to destroy the chart on unmount
    return (): void => {
      chartInstanceRef.current?.destroy()
      chartInstanceRef.current = null
    }
  }, [type, totalExpense, totalIncome])

  return <canvas ref={chartRef} className={className}></canvas>
}

export default DoughnutPieChart
