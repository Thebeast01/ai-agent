import { createAvatar } from '@dicebear/core';
import { botttsNeutral, initials } from '@dicebear/collection';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant?: 'botttsNeutral' | 'initials';
}
export const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatarProps) => {
  let avatar;
  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else if (variant === 'initials') {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }
  return (
    <Avatar>
      <AvatarImage
        src={avatar?.toDataUri()}
        alt='Avater'
        className={cn('w-14 h-14', className)}
      />
      <AvatarFallback className="bg-gray-200 text-gray-600">
        {seed.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
