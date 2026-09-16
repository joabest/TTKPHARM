export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo" aria-label="TTKFARMPRO">
      <svg viewBox="0 0 42 26" role="img" aria-hidden="true">
        <path d="M1 3h19v6h-6v14H7V9H1V3Zm21 0h19v6h-6v14h-7V9h-6V3Z" fill="currentColor" />
        <path d="m22 9 7 7-5 7h8l4-7-7-7h-7Z" fill="#a7ff3f" />
      </svg>
      {!compact && <span><b>TTK</b>FARM<em>PRO</em></span>}
    </div>
  );
}
