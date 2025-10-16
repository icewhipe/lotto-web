// OPTIMIZED - Reduced animations for better performance
export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Large purple orb - static */}
      <div
        className="absolute -top-48 -left-48 w-96 h-96 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)',
          filter: 'blur(40px)',
          willChange: 'transform'
        }}
      />

      {/* Medium blue orb - static */}
      <div
        className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Small pink orb - static */}
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Bottom gradient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 opacity-20"
        style={{
          background: 'linear-gradient(to top, rgba(139, 92, 246, 0.15), transparent)',
        }}
      />
    </div>
  )
}
