import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="ib-grad" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(280 90% 65%)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ib-grad)" />
        <path
          d="M7 16V8M12 16V8M17 16V8"
          stroke="white"
          strokeOpacity="0.92"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="7" cy="8" r="1.4" fill="white" />
        <circle cx="17" cy="16" r="1.4" fill="white" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight">IngenBoard</span>
    </div>
  );
}
