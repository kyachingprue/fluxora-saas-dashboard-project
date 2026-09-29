import { motion } from 'motion/react'
import {
  FaTruckMoving,
  FaTruck,
  FaTruckFront,
  FaTruckPickup,
} from 'react-icons/fa6'

const icons = {
  FaTruckMoving,
  FaTruck,
  FaTruckFront,
  FaTruckPickup,
}

export default function StatCard({ data, index }) {
  const [title, value, change, subtitle, iconName, gradient] = data
  const Icon = icons[iconName]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className={`group rounded-2xl bg-gradient-to-br ${gradient} to-transparent p-2 pt-3 shadow-sm transition-shadow hover:shadow-xl`}
    >
      <p className="px-2 pb-2 text-sm">{title}</p>

      <div className="flex items-center justify-between rounded-xl bg-white/90 p-3 dark:bg-slate-900/70">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl font-semibold">{value}</span>

            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300">
              {change}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>

        <Icon
          size={44}
          className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:scale-110 dark:text-slate-500"
        />
      </div>
    </motion.div>
  )
}
