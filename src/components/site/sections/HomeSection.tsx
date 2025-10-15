import GlassmorphicHome from '../GlassmorphicHome'

interface HomeSectionProps {
  isDark: boolean
  onNavigate: (section: string, subsection?: string) => void
  onNavigateToDiary: () => void
}

export default function HomeSection({ isDark, onNavigate, onNavigateToDiary }: HomeSectionProps) {
  // Use glassmorphic premium version
  return <GlassmorphicHome isDark={isDark} onNavigate={onNavigate} onNavigateToDiary={onNavigateToDiary} />
}
