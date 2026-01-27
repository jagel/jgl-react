import React from 'react';
import { Alert, Box, Typography, Button } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';

interface MfeBoundaryProps {
  children: React.ReactNode;
  mfeName: string;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  mfeName: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary, mfeName }) => (
  <Box sx={{ p: 3 }}>
    <Alert severity="error" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Failed to load {mfeName} micro frontend
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {error.message}
      </Typography>
      <Button 
        variant="outlined" 
        size="small" 
        onClick={resetErrorBoundary}
        sx={{ mt: 1 }}
      >
        Retry
      </Button>
    </Alert>
  </Box>
);

const MfeBoundary: React.FC<MfeBoundaryProps> = ({ children, mfeName }) => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} mfeName={mfeName} />
      )}
      onError={(error, errorInfo) => {
        console.error(`Error in ${mfeName} MFE:`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MfeBoundary;