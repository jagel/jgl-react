import React from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';

const buttonVariants = ['contained', 'outlined', 'text'] as const;
const buttonColors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const buttonSizes = ['small', 'medium', 'large'] as const;

export const ButtonsShowcase: React.FC = () => {
  return (
    <Box>
      {buttonVariants.map((variant) => (
        <Box key={variant} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Buttons
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom>
            Colors
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {buttonColors.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
              >
                {color}
              </Button>
            ))}
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            Sizes
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {buttonSizes.map((size) => (
              <Button
                key={size}
                variant={variant}
                size={size}
              >
                {size}
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default ButtonsShowcase;
