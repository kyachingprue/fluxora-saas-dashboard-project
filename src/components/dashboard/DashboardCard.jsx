import { motion } from 'motion/react'
import { Ellipsis } from 'lucide-react'

export default function DashboardCard({
  title,
  right,
  children,
  className = '',
  delay = 0,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={`card min-w-0 p-4 sm:p-5 ${className}`}
    >
      <div className="mb-3 flex min-w-0 items-center justify-between gap-2">
        <h2 className="truncate font-medium">{title}</h2>

        {right ?? (
          <button className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-200 transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">
            <Ellipsis size={16} />
          </button>
        )}
      </div>

      {children}
    </motion.section>
  )
}
