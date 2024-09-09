import { useEffect, useRef } from 'react'
import Chart, { type ChartType } from 'chart.js/auto'

interface DoughnutPieChartProps {
  type?: ChartType
  className?: string
}

const DoughnutPieChart = ({
  type = 'doughnut',
  className = '',
}: DoughnutPieChartProps): JSX.Element => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')
    if (!ctx) return

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

    const chart = new Chart(ctx, {
      type,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Disable the legend (tag labels)
          },
          tooltip: {
            enabled: false, // Disable tooltips
          },
        },
        interaction: {
          intersect: false, // Prevent intersection highlighting
        },
        events: [], // Disable all events, including click and hover
      },
    })

    // Cleanup the chart on component unmount
    return (): void => {
      chart.destroy()
    }
  }, [type])

  return <canvas ref={chartRef} className={className}></canvas>
}

export default DoughnutPieChart
