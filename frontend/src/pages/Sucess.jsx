
import { Container, Typography, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: 'green' }} />
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: 'green' }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Thank you for your purchase. Your payment has been processed successfully.
        Your CarPurchase details will be sent to your email shortly.

      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="success" href="/">
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default Success;
