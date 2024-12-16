import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {
    Card,
    Typography,
    Grid,
    Avatar,
    Box,
    Divider,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TotalUsers = () => {
    const { users, getallusers, dashdata, getdashdata } = useContext(AdminContext);

    const [selectedState, setSelectedState] = useState('');

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        getallusers(); 
    }, []);

    useEffect(() => {
        getdashdata(); 
    }, []);

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const filteredUsers = selectedState
        ? users.filter((user) => user.address?.LOCATION?.toUpperCase() === selectedState)
        : users;

    return dashdata && (
        <Box sx={{ p: 4, minHeight: '100vh' }}>
            <Typography variant="h4" fontWeight="bold" mb={3} color="green">
                All Users 🦥
            </Typography>

            {/* Dropdown for State Filter */}
            <FormControl sx={{ width: '300px', mb: 4 }}>
                <InputLabel
                    id="state-select-label"
                    sx={{ color: 'green', fontWeight: 'bold' }} // Green color for label
                >
                    Filter by State
                </InputLabel>
                <Select
                    labelId="state-select-label"
                    value={selectedState}
                    onChange={handleStateChange}
                    label="Filter by State"
                    sx={{
                        color: 'green', // Green text color
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'green' }, // Green border
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'darkgreen' }, // Darker green on hover
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'green' }, // Green border on focus
                    }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="NEW DELHI">NEW DELHI</MenuItem>
                    <MenuItem value="GUJARAT">GUJARAT</MenuItem>
                    <MenuItem value="HARYANA">HARYANA</MenuItem>
                    <MenuItem value="MUMBAI">MUMBAI</MenuItem>
                </Select>
            </FormControl>



            {filteredUsers.length > 0 ? (
                <Grid container spacing={6}>
                    {filteredUsers.map((user, index) => (
                        <Grid item xs={12} sm={6} md={3.9} key={index} >
                            <Card className='flex flex-row mr-96'
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    width: '392px',
                                    p: 3,
                                    borderRadius: 4,
                                    boxShadow: 5,
                                    transition: '0.3s',
                                    '&:hover': { boxShadow: 8, transform: 'scale(1.05)' },
                                }}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar
                                        src={user.image || 'https://via.placeholder.com/150'}
                                        alt={user.name}
                                        sx={{ width: 80, height: 80, mr: 2, border: '2px solid #1976d2' }}
                                    />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Gender: {user.gender}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Age: {calculateAge(user.dob)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Email: {user.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Phone: {user.phone}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Total Appointments: {
                                                dashdata?.userAppointments?.find(appointment => appointment.userId === user._id)?.totalAppointments || 'N/A'
                                            }
                                        </Typography>
                                    </Box>
                                </Box>

                                <div className='flex flex-row gap-3'>
                                    <div className='border p-1 border-green-500 bg-green-300 rounded text-xs '>{user.address.LOCATION}</div>
                                    <div className='border p-1 border-green-500 bg-green-300 rounded text-xs '>{user.address.LINE}</div>
                                </div>

                                <Divider sx={{ my: 2 }} />

                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        display="flex"
                                        alignItems="center"
                                        mb={1}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid',
                                                borderColor: 'green',
                                                px: 2,
                                                py: 1,
                                                borderRadius: '12px',
                                                backgroundColor: '#e8f5e9',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            <LocationOnIcon sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                            {user.full_address}
                                        </Box>
                                    </Typography>
                                    {/* Pet Info */}
                                    <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                                        <Box sx={{
                                            border: '1px solid',
                                            borderColor: 'green',
                                            px: 2,
                                            py: 1,
                                            borderRadius: '12px',
                                            backgroundColor: '#e0f7fa',
                                            fontSize: '0.875rem',
                                        }}>
                                            {user.pet_type}
                                        </Box>
                                        <Box sx={{
                                            border: '1px solid',
                                            borderColor: 'green',
                                            px: 2,
                                            py: 1,
                                            borderRadius: '12px',
                                            backgroundColor: '#e0f7fa',
                                            fontSize: '0.875rem',
                                        }}>
                                            {user.breed}
                                        </Box>
                                        <Box sx={{
                                            border: '1px solid',
                                            borderColor: 'green',
                                            px: 2,
                                            py: 1,
                                            borderRadius: '12px',
                                            backgroundColor: '#e0f7fa',
                                            fontSize: '0.875rem',
                                        }}>
                                            {user.category}
                                        </Box>
                                    </Box>

                                    <Box display="flex" gap={2} mt={2}>
                                        <Box
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'green',
                                                px: 2,
                                                py: 1,
                                                borderRadius: '12px',
                                                backgroundColor: '#e8f5e9',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Pet Age: {user.pet_age}
                                        </Box>
                                        <Box
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'green',
                                                px: 2,
                                                py: 1,
                                                borderRadius: '12px',
                                                backgroundColor: '#e8f5e9',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            Pet Gender: {user.pet_gender}
                                        </Box>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Chip
                                    icon={
                                        user.isAccountverified ? <VerifiedIcon /> : <ErrorOutlineIcon />
                                    }
                                    label={user.isAccountverified ? 'Verified Account' : 'Unverified Account'}
                                    color={user.isAccountverified ? 'success' : 'error'}
                                    variant="outlined"
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div className="flex justify-center items-center mt-6">
                    <p className="text-5xl sm:text-7xl md:text-4xl text-center font-extrabold text-green-400">
                        🦥No User🦦 <br /> Found in <br /> {selectedState ? `${selectedState}` : ''}
                    </p>
                </div>
            )}
        </Box>
    );
};

export default TotalUsers;
