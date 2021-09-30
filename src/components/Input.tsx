import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  onInputChange?: (e: any) => void
  onKeyDown?: (e:  React.KeyboardEvent<HTMLDivElement>) => void
}

const TodoInput = ({ value, onInputChange, onKeyDown, ...props }: InputProps) => {
  return (
        <input
          onKeyDown={onKeyDown}
          onChange={onInputChange}
          value={value}
          {...props}
        />
  )
}

export default TodoInput