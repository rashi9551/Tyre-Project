import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  MenuItem,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import axiosUser from '../../services/axios/authorityAxios';
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  borderRadius: theme.shape.borderRadius * 2,
}));


function Tyres() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productName: '',
    amount: '',
    vehicle:'',
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {data}=await axiosUser().post('/order',formData)
    console.log(data);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <Container maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
          Tyre Purchase Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
          <PhoneInput
  country={'us'} // default country
  value={formData.phone}
  onChange={phone => setFormData({...formData, phone})}
  inputStyle={{
    width: '100%',
    height: '56px',
    fontSize: '16px',
    paddingLeft: '48px',
    borderRadius: '4px',
  }}
  containerStyle={{
    marginTop: '16px',
    marginBottom: '8px',
  }}
  inputProps={{
    name: 'phone',
    required: true,
    autoFocus: true
  }}
/>
          <TextField
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="vehicle"
            label="vehicle No"
            name="vehicle"
            type="text"
            value={formData.vehicle}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="currentDate"
            label="Current Date"
            type="date"
            value={today}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dueDate"
            select
            label="Due Date (Months)"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select due date
            </MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default Tyres;
