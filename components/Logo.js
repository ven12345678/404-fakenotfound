import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ variant = 'text', theme = 'light', size = 'normal' }) => {
  const textColors = {
    light: {
      numbers: 'text-[#051C2C]',
      fake: 'text-red-600',
      notFound: 'text-[#051C2C]'
    },
    dark: {
      numbers: 'text-white',
      fake: 'text-red-500',
      notFound: 'text-white'
    }
  };

  const sizeClasses = {
    small: {
      container: 'text-lg',
      emoji: 'text-2xl',
      numbers: 'text-xl',
      text: 'text-sm'
    },
    normal: {
      container: 'text-xl',
      emoji: 'text-3xl',
      numbers: 'text-2xl',
      text: 'text-base'
    },
    large: {
      container: 'text-2xl',
      emoji: 'text-5xl',
      numbers: 'text-4xl',
      text: 'text-xl'
    }
  };

  if (variant === 'image') {
    return (
      <div className="flex items-center">
        <Image
          src="/logo.svg"
          alt="404 Fake Not Found"
          width={size === 'small' ? 120 : size === 'normal' ? 160 : 200}
          height={size === 'small' ? 40 : size === 'normal' ? 60 : 80}
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex items-center hover:opacity-90 transition-opacity">
      <div className="flex items-center">
        <span 
          className={`${sizeClasses[size].emoji} mr-2`} 
          role="img" 
          aria-label="detective"
        >
          🕵️‍♂️
        </span>
        <div className={`flex flex-col ${sizeClasses[size].container}`}>
          <div className="flex items-baseline">
            <span className={`${textColors[theme].numbers} ${sizeClasses[size].numbers} font-bold`}>
              404
            </span>
          </div>
          <div className="flex items-center -mt-1">
            <span className={`${textColors[theme].fake} ${sizeClasses[size].text} font-bold tracking-wide`}>
              FAKE
            </span>
            <span className={`${textColors[theme].notFound} ${sizeClasses[size].text} ml-2 font-bold`}>
              NOT FOUND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo; 