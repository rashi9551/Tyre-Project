import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';

function OfferMessage() {
  const [offerMessage, setOfferMessage] = useState('');

  const handleSendOffer = () => {
    // Implement the logic to send the offer message
    console.log('Sending offer:', offerMessage);
    // Reset the textarea after sending
    setOfferMessage('');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Create Special Offer
        </Typography>
        <Typography variant="body1" paragraph>
          Compose an attractive offer message to send to your customers.
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Offer Message"
          value={offerMessage}
          onChange={(e) => setOfferMessage(e.target.value)}
          placeholder="Enter your special offer details here..."
          sx={{ mb: 3 }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSendOffer}
            disabled={!offerMessage.trim()}
          >
            Send Offer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default OfferMessage;
