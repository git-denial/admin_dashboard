import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const SpinnerLoading = ({ className }: { className?: string }) => {
  return (
    <Loader2
      className={cn('my-28 text-white animate-spin', className)}
    />
  );
};

export default SpinnerLoading;