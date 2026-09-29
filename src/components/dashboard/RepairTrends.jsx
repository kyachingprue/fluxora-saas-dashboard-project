import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import DashboardCard from './DashboardCard'

const data = [
  {
    label: 'Jan',
    noRepair: 62,
    emergency: 14,
    nonScheduled: 18,
    scheduled: 8
  },
  {
    label: 'Feb',
    noRepair: 58,
    emergency: 17,
    nonScheduled: 16,
    scheduled: 9
  },
  {
    label: 'Mar',
    noRepair: 61,
    emergency: 13,
    nonScheduled: 17,
    scheduled: 9
  },
  {
    label: 'Apr',
    noRepair: 54,
    emergency: 18,
    nonScheduled: 19,
    scheduled: 9
  },
  {
    label: 'May',
    noRepair: 49,
    emergency: 21,
    nonScheduled: 20,
    scheduled: 10
  },
  {
    label: 'Jun',
    noRepair: 45,
    emergency: 23,
    nonScheduled: 21,
    scheduled: 11
  },
  {
    label: 'Jul',
    noRepair: 42,
    emergency: 24,
    nonScheduled: 22,
    scheduled: 12
  }
]

const series = [
  {
    key: 'noRepair',
    label: 'No Repair',
    color: '#94a3b8',
    gradient: 'noRepairGradient'
  },
  {
    key: 'emergency',
    label: 'Emergency',
    color: '#f59e0b',
    gradient: 'emergencyGradient'
  },
  {
    key: 'nonScheduled',
    label: 'Non-Scheduled',
    color: '#3b82f6',
    gradient: 'nonScheduledGradient'
  },
  {
    key: 'scheduled',
    label: 'Scheduled',
    color: '#8b5cf6',
    gradient: 'scheduledGradient'
  }
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[180px] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95"
    >
      <p className="mb-2 border-b border-slate-100 pb-2 text-xs font-semibold text-slate-800 dark:border-white/10 dark:text-white">
        {label}
      </p>

      <div className="space-y-1.5">
        {payload.map(item => {
          const currentSeries = series.find(
            itemConfig => itemConfig.key === item.dataKey
          )

          return (
            <div
              key={item.dataKey}
              className="flex items-center justify-between gap-5 text-[11px]"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: currentSeries?.color || item.color
                  }}
                />

                <span className="text-slate-500 dark:text-slate-400">
                  {currentSeries?.label || item.name}
                </span>
              </div>

              <span className="font-semibold text-slate-800 dark:text-white">
                {item.value}%
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function RepairTrends() {
  const [activeSeries, setActiveSeries] = useState(null)

  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      total: item.noRepair + item.emergency + item.nonScheduled + item.scheduled
    }))
  }, [])

  return (
    <DashboardCard title="Repair Priority Class Trends" delay={0.1}>
      <div className="w-full">
        {/* Chart */}
        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 5,
                left: -20,
                bottom: 5
              }}
            >
              <defs>
                <linearGradient
                  id="noRepairGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="emergencyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="nonScheduledGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>

                <linearGradient
                  id="scheduledGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-slate-200 dark:stroke-white/10"
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11
                }}
                className="fill-slate-400"
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10
                }}
                tickFormatter={value => `${value}%`}
                className="fill-slate-400"
              />

              <Tooltip
                cursor={{
                  stroke: '#94a3b8',
                  strokeWidth: 1,
                  strokeDasharray: '4 4'
                }}
                content={<CustomTooltip />}
              />

              {series.map(item => (
                <Area
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.label}
                  stroke={item.color}
                  fill={`url(#${item.gradient})`}
                  strokeWidth={activeSeries === item.key ? 3 : 2}
                  fillOpacity={activeSeries === item.key ? 1 : 0.7}
                  dot={false}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: '#ffffff'
                  }}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {series.map(item => (
            <button
              key={item.key}
              type="button"
              onMouseEnter={() => setActiveSeries(item.key)}
              onMouseLeave={() => setActiveSeries(null)}
              className="group flex items-center gap-1.5 text-[10px] text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: item.color
                }}
              />

              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}
