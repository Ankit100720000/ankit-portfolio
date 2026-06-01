import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const variants = {
  primary:
    'bg-white text-black hover:bg-slate-100',
  secondary:
    'border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]',
  ghost:
    'text-white hover:text-sky-200',
}

const Button = memo(function Button({
  children,
  className,
  href,
  icon: Icon,
  target,
  rel,
  variant = 'primary',
  download,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-[-0.01em] transition',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <motion.a
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        download={download}
        {...props}
      >
        <span>{children}</span>
        {Icon ? <Icon size={16} /> : null}
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      type="button"
      {...props}
    >
      <span>{children}</span>
      {Icon ? <Icon size={16} /> : null}
    </motion.button>
  )
})

export default Button
