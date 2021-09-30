import React from 'react'

export type BadgeColors = 'red' | 'green' | 'blue' | 'gray'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  colorScheme?: BadgeColors
}

const Badge = ({ colorScheme = 'gray', ...props }: BadgeProps) => {
  return (
    <div 
      className={`badge badge--${colorScheme}`}
      {...props}
    />
  )
}

export default Badge