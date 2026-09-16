import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} aria-label="TTKFARMPRO">
      <Image src="/tk2pharmpro-logo.png" alt="TK2PHARMPRO" width={1536} height={544} priority />
    </div>
  );
}
