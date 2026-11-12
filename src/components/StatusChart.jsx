import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { STATUSES } from '../hooks/useWatchlist.js'

// Chart.js needs the parts it uses to be registered once
ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = ['#6c757d', '#0d6efd', '#198754', '#dc3545']

// Doughnut chart: how many watchlist items are in each status
function StatusChart({ items }) {
  const counts = STATUSES.map((status) => items.filter((item) => item.status === status).length)

  const data = {
    labels: STATUSES,
    datasets: [
      {
        data: counts,
        backgroundColor: COLORS,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  }

  return (
    <div className="chart-box" role="img" aria-label={`Watchlist status chart: ${STATUSES.map((s, i) => `${counts[i]} ${s}`).join(', ')}`}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default StatusChart
