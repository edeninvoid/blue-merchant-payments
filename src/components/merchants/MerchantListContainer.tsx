import { cn } from '@/lib/utils';

export default function MerchantListContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      aria-label="Merchant List"
      className={cn(
        className,
        'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {children}
    </ul>
  );
}
