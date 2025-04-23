
import { Container, Typography, Button, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Cancel = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <CancelIcon sx={{ fontSize: 80, color: 'red' }} />
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'red' }}>
        Payment Cancelled
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Looks like you cancelled the payment. You can try again anytime.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="error" href="/buy">
          Try Again
        </Button>
      </Box>
    </Container>
  );
};

export default Cancel;
