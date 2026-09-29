import DashboardCard from './DashboardCard'

const comments = [
  ['Serina Helen', '06', 'a month ago', 47],
  ['Jamina Hean', '02', '5 month ago', 5],
  ['Saif Hasan', '04', '8 month ago', 33],
  ['Sabbir Rahman', '07', '9 month ago', 12],
  ['Fariya Talukder', '01', '10 month ago', 44],
  ['Titas Talukder', '04', '7 month ago', 23],
  ['Kyachingprue', '14', '1 month ago', 24],
  ['Enuching', '09', '2 month ago', 30],
]

export default function RecentComments() {
  return (
    <DashboardCard title="Recent Comments" delay={0.05}>
      <div className="overflow-auto">
        <div className="min-w-[330px] h-[340px]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 rounded-lg bg-slate-100/70 px-3 py-2 text-xs text-slate-500 dark:bg-white/5">
            <span>Name</span>
            <span>Issue</span>
            <span className="w-20">Month</span>
          </div>

          {comments.map(([name, issue, month, avatar]) => (
            <div
              key={name}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-lg px-3 py-2.5 text-sm transition hover:bg-sky-50/70 dark:hover:bg-white/5"
            >
              <span className="flex min-w-0 items-center gap-2">
                <img
                  src={`https://i.pravatar.cc/40?img=${avatar}`}
                  alt=""
                  className="h-7 w-7 shrink-0 rounded-full"
                />

                <span className="truncate">{name}</span>
              </span>

              <span className="rounded bg-rose-100 px-2 text-xs leading-5 text-rose-500 dark:bg-rose-500/20">
                {issue}
              </span>

              <span className="w-20 text-xs text-slate-500">
                {month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}
