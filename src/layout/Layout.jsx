import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  Menu,
  X,
  Search,
  Bell,
  CircleHelp,
  Plus,
  Crown,
  Sparkles,
  Sun,
  Moon,
  ChevronsUpDown,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react'
import { mainNav, otherNav } from '../data.js'
import { useTheme } from '../theme.jsx'

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-blue-500/30">
        <Sparkles size={20} />
      </div>
      <span className="text-xl font-semibold">Fluxora</span>
    </div>
  )
}

function NavList({ onNavigate, collapsed }) {
  const link = ({ isActive }) =>
    `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
      isActive
        ? 'bg-white text-blue-600 shadow-sm dark:bg-white/10 dark:text-sky-300'
        : 'text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/5'
    } ${collapsed ? 'justify-center' : ''}`

  const render = items =>
    items.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/'}
        onClick={onNavigate}
        title={collapsed ? label : undefined}
        className={link}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="active-bar"
                className="absolute -left-4 h-6 w-1 rounded-r bg-blue-500"
              />
            )}

            <Icon
              size={18}
              className="shrink-0 transition-transform group-hover:scale-110"
            />

            {!collapsed && <span className="flex-1">{label}</span>}
          </>
        )}
      </NavLink>
    ))

  return (
    <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4">
      {!collapsed && (
        <p className="px-3 pb-1 pt-2 text-xs text-slate-400">
          MAIN MENU
        </p>
      )}

      {render(mainNav)}

      {!collapsed && (
        <p className="mt-6 px-3 pb-1 text-xs text-slate-400">
          Others
        </p>
      )}

      {render(otherNav)}
    </nav>
  )
}

function SidebarBody({
  onNavigate,
  closeBtn,
  collapsed,
  setCollapsed
}) {
  const { theme, toggle } = useTheme()

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 py-5">
      <div
        className={`flex items-center ${
          collapsed ? 'justify-center' : 'justify-between'
        } px-5`}
      >
        {closeBtn}

        {!collapsed && <Logo />}

        {closeBtn ? (
          <span className="w-10" />
        ) : (
          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed(!collapsed)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition hover:bg-white/60 dark:hover:bg-white/5"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} className="text-slate-400" />
            ) : (
              <PanelLeftClose size={18} className="text-slate-400" />
            )}
          </button>
        )}
      </div>

      <NavList
        onNavigate={onNavigate}
        collapsed={collapsed}
      />

      <div className="space-y-3 px-4">
        <button
          onClick={toggle}
          title={collapsed ? 'Toggle theme' : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-white/60 dark:hover:bg-white/5 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Sparkles size={20} className="shrink-0 text-violet-500" />

          {!collapsed && (
            <>
              Pro Mode

              <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
                {theme === 'dark' ? (
                  <Moon size={14} />
                ) : (
                  <Sun size={14} />
                )}
                {theme}
              </span>
            </>
          )}
        </button>

        {!collapsed && (
          <div className="card flex items-center gap-3 p-3">
            <img
              src="https://i.pravatar.cc/80?img=12"
              alt="Tahsan Khan"
              className="h-10 w-10 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                Kyaching prue
              </p>

              <p className="truncate text-xs text-slate-400">
                kyachingprue@gmail.com
              </p>
            </div>

            <ChevronsUpDown
              size={16}
              className="text-slate-400"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const iconBtn =
    'grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white/80 transition hover:scale-105 hover:shadow dark:border-white/10 dark:bg-white/5'

  return (
    <div className="app-bg h-screen overflow-hidden p-0 sm:p-3 lg:p-5">
      <div className="mx-auto flex h-full min-h-0 max-w-[1600px] overflow-hidden rounded-none border border-white/70 bg-white/40 shadow-2xl shadow-indigo-200/40 backdrop-blur-2xl sm:rounded-3xl dark:border-white/10 dark:bg-slate-900/40 dark:shadow-black/40">

        {/* Desktop Sidebar */}
        <aside
          className={`hidden h-full shrink-0 transition-[width] duration-300 lg:block ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          <SidebarBody
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </aside>

        {/* Main Area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2.5 sm:p-4 lg:pl-0">
          <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/70 bg-white/60 sm:rounded-3xl dark:border-white/10 dark:bg-slate-950/40">

            {/* Header */}
            <header className="flex shrink-0 items-center gap-2 border-b border-slate-200/70 p-3 sm:gap-3 sm:p-4 dark:border-white/10">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className={`${iconBtn} lg:hidden`}
              >
                <Menu size={20} />
              </button>

              <div className="flex h-10 max-w-md min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 dark:border-white/10 dark:bg-white/5">
                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  placeholder="Search Fleet..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

                <span className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
                  All <ChevronDown size={14} />
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className={`${iconBtn} hidden sm:grid`}>
                  <Bell size={18} />
                </button>

                <button className={`${iconBtn} hidden md:grid`}>
                  <CircleHelp size={18} />
                </button>

                <button className={`${iconBtn} hidden md:grid`}>
                  <Plus size={18} />
                </button>

                <button
                  onClick={toggle}
                  aria-label="Toggle theme"
                  className={iconBtn}
                >
                  {theme === 'dark' ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}
                </button>

                <button className="hidden h-10 items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white transition hover:scale-105 xl:flex dark:bg-white dark:text-slate-900">
                  <Crown size={16} />
                  Explore Plans
                </button>

                <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 sm:px-4">
                  <Sparkles size={16} />
                  <span className="hidden sm:inline">
                    Ask AI
                  </span>
                </button>
              </div>
            </header>

            {/* Scrollable Main Content */}
            <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              key="drawer"
              className="app-bg fixed inset-y-0 left-0 z-50 w-full max-w-sm shadow-2xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 260
              }}
            >
              <SidebarBody
                collapsed={false}
                setCollapsed={() => {}}
                onNavigate={() => setOpen(false)}
                closeBtn={
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className={iconBtn}
                  >
                    <X size={20} />
                  </button>
                }
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

