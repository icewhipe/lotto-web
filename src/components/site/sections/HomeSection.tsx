import LiquidGlassHome from '../LiquidGlassHome'

interface HomeSectionProps {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
  onNavigateToDiary: () => void
}

export default function HomeSection({ isDark, onNavigate, onNavigateToDiary }: HomeSectionProps) {
  // Use liquid glass premium version
  return <LiquidGlassHome isDark={isDark} onNavigate={onNavigate} onNavigateToDiary={onNavigateToDiary} />
}
