import { AlertTriangle } from "lucide-react";

export function AlertBanner({ message }: { message: string }) {
  return (
    <div className="rounded-[24px] border border-rose-200 bg-rose-50 p-5 text-rose-900 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-1 h-6 w-6 flex-none text-rose-600" />
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-rose-700">Safety alert</p>
          <p className="mt-2 text-lg leading-8">{message}</p>
        </div>
      </div>
    </div>
  );
}
