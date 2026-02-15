"use client";

interface ErrorStateProps {
  icon?: string;
  title?: string;
  message?: string;
  action?: { label: string; onClick: () => void };
}

export function ErrorState({
  icon = "😞",
  title = "कुछ गड़बड़ हो गई",
  message,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl md:text-6xl mb-4" role="img" aria-hidden>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-black mb-2">{title}</h3>
      {message && (
        <p className="text-neutral-grey mb-6 max-w-md text-sm md:text-base">
          {message}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="rounded-xl bg-primary-navy px-6 py-3 text-sm font-medium text-white shadow-card hover:bg-primary-navy/90 transition-colors min-h-[44px]"
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
