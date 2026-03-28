import { cn } from '@/lib/utils';
import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { useResolveClassNames } from 'uniwind';

type IconProps = Omit<LucideProps, 'color'> & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * Resolves Tailwind text-color classes into the icon's `color` prop.
 *
 * @example
 * <Icon as={ArrowRight} className="text-red-500" size={16} />
 */
function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  const resolvedStyle = useResolveClassNames(cn('text-foreground', className));
  const color = resolvedStyle.color as string | undefined;

  return (
    <IconComponent
      {...props}
      size={size}
      color={color}
    />
  );
}

export { Icon };
