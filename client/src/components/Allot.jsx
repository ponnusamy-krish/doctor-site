import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers' ;
import{ DatePicker} from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format, addDays, differenceInHours, differenceInMinutes } from 'date-fns';

function Allot() {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [lunchStart, setLunchStart] = useState(null);
    const [lunchEnd, setLunchEnd] = useState(null);
    const [slots, setSlots] = useState('');
    const [personsPerSlot, setPersonsPerSlot] = useState('');
    const [totalWorkingHours, setTotalWorkingHours] = useState(0);
    const [slotDuration, setSlotDuration] = useState(0);

    useEffect(() => {
        if (startTime && endTime) {
            let workHours = differenceInHours(endTime, startTime);
            if (lunchStart && lunchEnd) {
                workHours -= differenceInHours(lunchEnd, lunchStart);
            }
            setTotalWorkingHours(workHours);
        }
    }, [startTime, endTime, lunchStart, lunchEnd]);

    useEffect(() => {
        if (slots && totalWorkingHours) {
            const duration = (totalWorkingHours * 60) / slots; // duration in minutes
            setSlotDuration(duration);
        }
    }, [slots, totalWorkingHours]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission
    };

    const isDateInThisWeek = (date) => {
        const today = new Date();
        const nextFriday = addDays(today, (5 - today.getDay() + 7) % 7);
        return date >= today && date <= nextFriday;
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: 'auto' }}>
                <Typography variant="h4">Doctor's Booking Form</Typography>
                <DatePicker
                    label="Select Day"
                    value={selectedDay}
                    onChange={setSelectedDay}
                    shouldDisableDate={date => !isDateInThisWeek(date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />
                {selectedDay && (
                    <>
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={setStartTime}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={setEndTime}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TimePicker
                            label="Lunch Start"
                            value={lunchStart}
                            onChange={setLunchStart}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <TimePicker
                            label="Lunch End"
                            value={lunchEnd}
                            onChange={setLunchEnd}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <Typography variant="caption">Total Working Hours: {totalWorkingHours} hours</Typography>
                        <TextField
                            label="Number of Slots"
                            type="number"
                            value={slots}
                            onChange={(e) => setSlots(e.target.value)}
                            fullWidth
                        />
                    </>
                )}
                {slots && (
                    <>
                        <Typography variant="caption">Duration per Slot: {slotDuration.toFixed(2)} minutes</Typography>
                        <TextField
                            label="Persons per Slot"
                            type="number"
                            value={personsPerSlot}
                            onChange={(e) => setPersonsPerSlot(e.target.value)}
                            fullWidth
                        />
                        {personsPerSlot && (
                            <Typography variant="caption">
                                Time per Person: {(slotDuration / personsPerSlot).toFixed(2)} minutes
                            </Typography>
                        )}
                    </>
                )}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Submit Booking
                </Button>
            </form>
        </LocalizationProvider>
    );
}

export default Allot;
