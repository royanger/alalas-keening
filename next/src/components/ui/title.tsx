import clsx from 'clsx'

const types = {
  h1: 'text-3xl md:text-4xl font-title mt-6 mb-2 text-gray-700 dark:text-gray-200',
  h2: 'text-2.5xl md:text-3xl font-title mt-4 mb-2 text-slate-600 dark:text-gray-300',
  h3: 'text-2xl font-title mt-4 mb-2 p-2',
  h4: 'text-2xl font-sans mt-3',
  h5: 'text-xl font-sans mt-3',
  h6: 'text-lg font-sans mt-3',
}

const variants = {
  default: 'font-normal',
  bold: 'font-bold',
}

interface TitleProps {
  children: React.ReactNode
  type: keyof typeof types
  variant?: keyof typeof variants
  css?: string
}

export const Title: React.FC<TitleProps> = ({
  children,
  type,
  variant = 'default',
  css,
}) => {
  const Type = type as keyof JSX.IntrinsicElements

  return (
    <div
      className={clsx(
        types[type],
        variants && variants[variant],
        css ? css : ''
      )}
    >
      <Type>{children}</Type>
    </div>
  )
}
