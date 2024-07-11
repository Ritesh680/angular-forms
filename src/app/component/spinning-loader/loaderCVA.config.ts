// src/cva.config.ts
import { VariantProps, cva } from 'class-variance-authority';

export type LoaderVariantProps = VariantProps<typeof loaderClass>;

export const loaderClass = cva(
  'progress-spinner progress-spinner-double progress-spinner-active',
  {
    variants: {
      intent: {
        primary: 'border-primary',
        danger: 'border-danger',
        none: '',
      },
      size: {
        small: ' size-sm ',
        medium: '',
        large: 'size-lg',
      },
      disabled: {
        true: 'disabled',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      intent: 'none',
    },
  }
);
