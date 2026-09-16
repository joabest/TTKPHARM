import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} aria-label="TTKFARMPRO">
      <Image src="/ttkfarmpro-logo.svg" alt="TTKFARMPRO" width={520} height={72} priority />
    </div>
  );
}
