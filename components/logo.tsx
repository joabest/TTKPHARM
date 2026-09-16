export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} aria-label="TTKFARMPRO">
      <svg viewBox="0 0 286 44" role="img" aria-hidden="true">
        <g fill="currentColor">
          <path d="M2 5h62v10H44v24H28V15H2V5Z" />
          <path d="M58 5h61v10H99v24H83V15H58V5Z" />
          <path d="M113 5h16v12l18-12h23l-27 17 29 17h-24l-19-12v12h-16V5Z" />
          <path d="M176 5h42v10h-27v7h24v9h-24v8h-15V5Z" />
          <path d="M220 5h16l15 34h-15l-2-6h-14l-2 6h-15l17-34Zm3 19h8l-4-11-4 11Z" />
          <path d="M250 5h28c5 0 8 3 8 8v8c0 4-2 6-5 7l7 11h-16l-6-10h-1v10h-15V5Zm15 9v7h6v-7h-6Z" />
        </g>
        <path d="M167 4v36" stroke="#747780" strokeWidth="1" />
      </svg>
      {!compact && <span>FARM <b>PRO</b></span>}
    </div>
  );
}
