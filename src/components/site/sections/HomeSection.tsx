// LiquidGlassHome removed - using FinalMainSite now

interface HomeSectionProps {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
  onNavigateToDiary: () => void
}

export default function HomeSection({ isDark }: HomeSectionProps) {
  return (
    <section className="container mx-auto px-6 py-20">
      <h1 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Главная
      </h1>
      <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Добро пожаловать на главную страницу ЛПТТ
      </p>
    </section>
  )
}
