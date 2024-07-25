// src/cva.config.ts
import { VariantProps, cva } from 'class-variance-authority';

export type ButtonVariantProps = VariantProps<typeof buttonClasses>;

export const buttonClasses = cva('btn text-nowrap', {
  variants: {
    intent: {
      primary: 'btn-primary',
      primaryOutline: 'btn-outline-primary',
      secondary: 'bg-secondary',
      danger: 'btn-danger',
      dangerOutline: 'btn-outline-danger',
      success: 'btn-success',
      secondaryOutline: 'btn-outline-secondary',
      link: 'btn-link text-primary px-0',
    },
    size: {
      small: 'fs-6 px-2 padding-sm',
      medium: 'fs-5',
      large: 'fs-4',
    },
    disabled: {
      true: 'disabled',
      false: '',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'small',
    disabled: false,
  },
});
