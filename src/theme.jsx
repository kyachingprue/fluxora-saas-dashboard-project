import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext({})
export const useTheme = () => useContext(Ctx)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const s = localStorage.getItem('theme')
      if (s) return s
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])
  return (
    <Ctx.Provider
      value={{
        theme,
        toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
