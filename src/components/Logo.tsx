interface LogoIconProps {
  size?: number
}

interface LogoProps {
  size?: number
  darkBg?: boolean
  showTagline?: boolean
}

export function LogoIcon({ size = 40 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rounded square background */}
      <rect width="44" height="44" rx="10" fill="#ed7220" />

      {/* M shape — two outer strokes meet at center bottom like caring arms */}
      <path
        d="M 10 33 L 10 16 L 22 26 L 34 16 L 34 33"
        stroke="white"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Heart above the M — sits between the two peaks */}
      <path
        d="M 22 13 C 22 13 15.5 9 15.5 6 C 15.5 3.5 17.8 2.2 19.8 4.2 L 22 6.5 L 24.2 4.2 C 26.2 2.2 28.5 3.5 28.5 6 C 28.5 9 22 13 22 13 Z"
        fill="white"
      />
    </svg>
  )
}

export default function Logo({ size = 40, darkBg = false, showTagline = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <LogoIcon size={size} />
      <div>
        <div
          className={`font-bold leading-none tracking-tight ${
            size >= 36 ? 'text-xl' : 'text-base'
          } ${darkBg ? 'text-white' : 'text-brand-600'}`}
        >
          MANAM
        </div>
        {showTagline && (
          <div className={`text-xs leading-none mt-0.5 ${darkBg ? 'text-gray-300' : 'text-gray-500'}`}>
            Elder Care Platform
          </div>
        )}
      </div>
    </div>
  )
}
