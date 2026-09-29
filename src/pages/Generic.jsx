import { Helmet } from 'react-helmet-async'
import { motion } from 'motion/react'
import { Plus, Filter } from 'lucide-react'
import { pages, rowsFor, mainNav, otherNav } from '../data.js'

function Badge({ s }) {
  const value = String(s)

  const isNegative =
    value.toLowerCase().includes('critical') ||
    value.toLowerCase().includes('high') ||
    value.toLowerCase().includes('failed') ||
    value.toLowerCase().includes('overdue')

  const isPositive =
    value.toLowerCase().includes('active') ||
    value.toLowerCase().includes('completed') ||
    value.toLowerCase().includes('healthy') ||
    value.toLowerCase().includes('success')

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        isNegative
          ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
          : isPositive
            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
            : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
      }`}
    >
      {s}
    </span>
  )
}

export default function Generic({ slug }) {
  const p = pages[slug]
  const Icon = [...mainNav, ...otherNav].find(n => n.to === '/' + slug).icon
  const rows = rowsFor(p.keys)
  return (
    <>
      <Helmet>
        <title>{p.title} · Fleer</title>
        <meta name="description" content={p.sub} />
      </Helmet>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 text-white">
            <Icon size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {p.sub}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="card flex h-10 items-center gap-2 px-3 text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:scale-105">
            <Plus size={16} />
            {p.action}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {p.stats.map(([l, v, d], i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="card p-4"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{l}</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-semibold sm:text-3xl">{v}</span>
              <span
                className={`mb-1 rounded-md px-1.5 text-xs ${d.startsWith('-') ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20'}`}
              >
                {d}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card mt-5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-100/70 text-slate-500 dark:bg-white/5 dark:text-slate-400">
              <tr>
                {p.cols.map(c => (
                  <th key={c} className="px-4 py-3 font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-100 transition-colors hover:bg-sky-50/70 dark:border-white/5 dark:hover:bg-white/5"
                >
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-3.5">
                      {/Status|Result|Priority/.test(p.cols[j]) ? (
                        <Badge s={c} />
                      ) : (
                        c
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  )
}
