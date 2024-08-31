import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface PieChartProps {
  className?: string
}

const PieChart = ({ className = '' }: PieChartProps): JSX.Element => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')
    if (!ctx) return

    // Pie chart configuration
    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverOffset: 4,
        },
      ],
    }

    // Creating the pie chart
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        animation: {
          animateRotate: true,
        },
        responsive: true,
        plugins: {
          legend: {
            display: false, // Disable the legend (tag labels)
          },
        },
      },
    })

    // Cleanup the chart on component unmount
    return (): void => {
      pieChart.destroy()
    }
  }, [])

  return <canvas ref={chartRef} className={className}></canvas>
}

export default PieChart
