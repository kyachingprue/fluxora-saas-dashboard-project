import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import {
  Plus,
  Ellipsis,
  ChevronsUpDown,
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import MeterChart from '../components/dashboard/MeterChart'
import FleetMap from '../components/dashboard/FleetMap'
import RepairGauge from '../components/dashboard/RepairGauge'
import RecentComments from '../components/dashboard/RecentComments'
import RepairTrends from '../components/dashboard/RepairTrends'


const stats = [
  ['Total Vehicles', '248', '+8.4%', 'from last month', 'FaTruckMoving', 'from-violet-100/80 dark:from-violet-500/20'],
  ['Active Vehicles', '192', '77.4%', 'of total fleet', 'FaTruck', 'from-emerald-100/80 dark:from-emerald-500/20'],
  ['Fleet Utilization', '82.6%', '+5.2%', 'from last month', 'FaTruckFront', 'from-orange-100/80 dark:from-orange-500/20'],
  ['Fleet Health', '91%', '+4.8%', 'from last month', 'FaTruckPickup', 'from-sky-100/80 dark:from-sky-500/20'],
]

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard · Fluxora</title>
        <meta
          name="description"
          content="Fleet performance and AI-powered insights."
        />
      </Helmet>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Good afternoon, Tahsan{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 20, -8, 20, 0] }}
              transition={{ duration: 1.6, delay: 0.4 }}
            >
              👋
            </motion.span>
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Here's your fleet performance and AI-powered insights for today.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button className="card hidden h-10 items-center gap-8 px-3 text-sm text-slate-400 sm:flex">
            All groups <ChevronsUpDown size={14} />
          </button>

          <button className="card flex h-10 flex-1 items-center justify-center gap-2 px-3 text-sm sm:flex-none">
            <Plus size={16} /> Add Widgets
          </button>

          <button className="card grid h-10 w-10 shrink-0 place-items-center">
            <Ellipsis size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat[0]} data={stat} index={index} />
        ))}
      </div>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-5">
        <MeterChart />
        <FleetMap />
      </div>

      <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RepairGauge />
        <RecentComments />

        <div className="min-w-0 md:col-span-2 xl:col-span-1">
          <RepairTrends />
        </div>
      </div>
    </>
  )
}
