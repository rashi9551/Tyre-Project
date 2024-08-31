import React, { useState, useEffect } from 'react';
import {
    Container, Box, Typography, TextField, Button,
    Card, CardContent, CardActions, Grid, Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', branch: '', email: '', phone: '' });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBranch, setFilterBranch] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    const branches = ['Bangalore', 'Dubai', 'Qatar'];

    useEffect(() => {
        const results = employees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterBranch === '' || employee.branch === filterBranch)
        );
        setFilteredEmployees(results);
    }, [employees, searchTerm, filterBranch]);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(String(phone));
    };

    const validateForm = (employee) => {
        const newErrors = {};
        if (!employee.name) newErrors.name = 'Name is required';
        if (!employee.branch) newErrors.branch = 'Branch is required';
        if (!employee.email) newErrors.email = 'Email is required';
        else if (!validateEmail(employee.email)) newErrors.email = 'Invalid email format';
        if (!employee.phone) newErrors.phone = 'Phone number is required';
        else if (!validatePhone(employee.phone)) newErrors.phone = 'Invalid phone number (10 digits required)';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddOrUpdateEmployee = () => {
        const employeeToValidate = editingEmployee || newEmployee;
        if (validateForm(employeeToValidate)) {
            if (editingEmployee) {
                setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
                setEditingEmployee(null);
                setSnackbarMessage('Employee updated successfully');
            } else {
                setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
                setNewEmployee({ name: '', branch: '', email: '', phone: '' });
                setSnackbarMessage('New employee added successfully');
            }
            setOpenSnackbar(true);
        }
    };

    const handleDeleteEmployee = () => {
        setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
        setOpenDialog(false);
        setEmployeeToDelete(null);
        setSnackbarMessage('Employee deleted successfully');
        setOpenSnackbar(true);
    };

    return (
        <Container maxWidth="md" >
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Employee Management
                </Typography>

                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                        </Typography >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={editingEmployee ? editingEmployee.name : newEmployee.name}
                                    onChange={(e) => editingEmployee
                                        ? setEditingEmployee({ ...editingEmployee, name: e.target.value })
                                        : setNewEmployee({ ...newEmployee, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={!!errors.branch}>
                                    <InputLabel>Branch</InputLabel>
                                    <Select
                                        value={editingEmployee ? editingEmployee.branch : newEmployee.branch}
                                        onChange={(e) => editingEmployee
                                            ? setEditingEmployee({ ...editingEmployee, branch: e.target.value })
                                            : setNewEmployee({ ...newEmployee, branch: e.target.value })}
                                    >
                                        {branches.map((branch) => (
                                            <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.branch && <Typography color="error">{errors.branch}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={editingEmployee ? editingEmployee.email : newEmployee.email}
                                    onChange={(e) => editingEmployee
                                        ? setEditingEmployee({ ...editingEmployee, email: e.target.value })
                                        : setNewEmployee({ ...newEmployee, email: e.target.value })}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    value={editingEmployee ? editingEmployee.phone : newEmployee.phone}
                                    onChange={(e) => editingEmployee
                                        ? setEditingEmployee({ ...editingEmployee, phone: e.target.value })
                                        : setNewEmployee({ ...newEmployee, phone: e.target.value })}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={editingEmployee ? <EditIcon /> : <AddIcon />}
                                    onClick={handleAddOrUpdateEmployee}
                                >
                                    {editingEmployee ? 'Update' : 'Add'}
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent >
                </Card >

                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: <SearchIcon />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Filter by Branch</InputLabel>
                                <Select
                                    value={filterBranch}
                                    onChange={(e) => setFilterBranch(e.target.value)}
                                >
                                    <MenuItem value="">All Branches</MenuItem>
                                    {branches.map((branch) => (
                                        <MenuItem key={branch} value={branch}>{branch}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={3}>
                    {filteredEmployees.map((employee) => (
                        <Grid item xs={12} sm={6} md={4} key={employee.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {employee.name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Branch: {employee.branch}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Email: {employee.email}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Phone: {employee.phone}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => setEditingEmployee(employee)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => {
                                            setEmployeeToDelete(employee);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box >

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteEmployee} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container >
    );
};

export default EmployeeManagement;
