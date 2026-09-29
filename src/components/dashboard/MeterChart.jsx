import { useState } from 'react'
import { motion } from 'motion/react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import DashboardCard from './DashboardCard'

const chartData = {
  Miles: [
    { day: 'Aug 25', value: 42 },
    { day: 'Aug 26', value: 55 },
    { day: 'Aug 27', value: 48 },
    { day: 'Aug 28', value: 68 },
    { day: 'Aug 29', value: 61 },
    { day: 'Aug 30', value: 76 },
    { day: 'Aug 31', value: 70 }
  ],

  Kilometers: [
    { day: 'Aug 25', value: 67 },
    { day: 'Aug 26', value: 84 },
    { day: 'Aug 27', value: 76 },
    { day: 'Aug 28', value: 101 },
    { day: 'Aug 29', value: 94 },
    { day: 'Aug 30', value: 118 },
    { day: 'Aug 31', value: 109 }
  ],

  Hours: [
    { day: 'Aug 25', value: 38 },
    { day: 'Aug 26', value: 51 },
    { day: 'Aug 27', value: 45 },
    { day: 'Aug 28', value: 72 },
    { day: 'Aug 29', value: 63 },
    { day: 'Aug 30', value: 79 },
    { day: 'Aug 31', value: 74 }
  ]
}

const unitOptions = ['Miles', 'Kilometers', 'Hours']

function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[150px] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95"
    >
      <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

          <span className="text-xs text-slate-600 dark:text-slate-300">
            Meter
          </span>
        </div>

        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {payload[0].value} {unit}
        </span>
      </div>
    </motion.div>
  )
}

export default function MeterChart() {
  const [unit, setUnit] = useState('Hours')
  const [activeIndex, setActiveIndex] = useState(null)

  const data = chartData[unit]

  return (
    <DashboardCard
      title="Latest Meter Readings"
      className="lg:col-span-3"
      right={
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-white/5">
          {unitOptions.map(value => {
            const isActive = unit === value

            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setUnit(value)
                  setActiveIndex(null)
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all sm:text-xs ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-sky-300'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {value}
              </button>
            )
          })}
        </div>
      }
    >
      <div className="w-full">
        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: -15,
                bottom: 5
              }}
              barCategoryGap="22%"
            >
              <defs>
                <linearGradient
                  id="meterBarGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={1} />

                  <stop offset="55%" stopColor="#3b82f6" stopOpacity={0.95} />

                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.9} />
                </linearGradient>

                <linearGradient
                  id="meterActiveGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity={1} />

                  <stop offset="50%" stopColor="#2563eb" stopOpacity={1} />

                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={1} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-slate-200 dark:stroke-white/10"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10
                }}
                tickMargin={8}
                className="fill-slate-400"
              />

              <YAxis
                domain={[0, 120]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10
                }}
                tickFormatter={value => value}
                width={35}
                className="fill-slate-400"
              />

              <Tooltip
                cursor={{
                  fill: 'rgba(59, 130, 246, 0.06)'
                }}
                content={<CustomTooltip unit={unit} />}
              />

              <Bar
                dataKey="value"
                name="Meter"
                fill="url(#meterBarGradient)"
                radius={[8, 8, 3, 3]}
                maxBarSize={42}
                animationDuration={900}
                animationEasing="ease-out"
                onMouseEnter={(_, index) => {
                  setActiveIndex(index)
                }}
                onMouseLeave={() => {
                  setActiveIndex(null)
                }}
              >
                {data.map((item, index) => (
                  <Cell
                    key={`${item.day}-${index}`}
                    fill={
                      activeIndex === index
                        ? 'url(#meterActiveGradient)'
                        : 'url(#meterBarGradient)'
                    }
                    opacity={
                      activeIndex !== null && activeIndex !== index ? 0.45 : 1
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600" />

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Daily {unit.toLowerCase()}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-400">Average: </span>

              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {Math.round(
                  data.reduce((sum, item) => sum + item.value, 0) / data.length
                )}{' '}
                {unit}
              </span>
            </div>

            <div>
              <span className="text-slate-400">Peak: </span>

              <span className="font-semibold text-blue-500">
                {Math.max(...data.map(item => item.value))} {unit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
