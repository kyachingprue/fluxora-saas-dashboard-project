import { motion } from 'motion/react'
import DashboardCard from './DashboardCard'

export default function RepairGauge() {
  const ticks = Array.from({ length: 64 }, (_, index) => {
    const angle = ((-225 + (index * 270) / 63) * Math.PI) / 180

    return {
      x1: 100 + 66 * Math.cos(angle),
      y1: 100 + 66 * Math.sin(angle),
      x2: 100 + 92 * Math.cos(angle),
      y2: 100 + 92 * Math.sin(angle),
      stroke: `hsl(${255 - (index / 63) * 110} 70% 62%)`,
    }
  })

  return (
    <DashboardCard title="Top Reasons for Repair">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-52 shrink-0">
          <svg viewBox="0 0 200 200">
            {ticks.map((tick, index) => (
              <line key={index} {...tick} strokeWidth="1.6" />
            ))}

            <motion.g
              initial={{ rotate: -90 }}
              whileInView={{ rotate: 8 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 40,
                damping: 10,
                delay: 0.3,
              }}
              style={{
                transformOrigin: '100px 100px',
                transformBox: 'view-box',
              }}
            >
              <path
                d="M100 100 L92 100 L100 40 L108 100 Z"
                className="fill-blue-500"
              />

              <circle
                cx="100"
                cy="100"
                r="7"
                className="fill-white stroke-blue-500"
                strokeWidth="4"
              />
            </motion.g>
          </svg>

          <div className="absolute inset-x-0 bottom-3 text-center">
            <p className="text-[11px] text-slate-400">Fuel Costs</p>
            <p className="text-2xl font-semibold">
              89.57<span className="text-sm text-slate-400">%</span>
            </p>
          </div>
        </div>

        <div className="w-full text-sm">
          <p className="mb-2 font-medium">Total Repair</p>

          {[
            ['Worn Out', '20%', 'bg-sky-500'],
            ['Oil', '27.7%', 'bg-violet-500'],
            ['Routine', '42.5%', 'bg-emerald-500'],
          ].map(([label, value, dot]) => (
            <div key={label} className="flex items-center gap-2 py-1">
              <span className={`h-3 w-3 rounded-full ${dot}`} />
              {label}

              <span className="ml-auto text-emerald-600 dark:text-emerald-400">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}
