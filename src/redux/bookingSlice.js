import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedSeats: [], // Array of seat IDs
    selectedShow: null,
    bookings: [], // Local history
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        selectShow: (state, action) => {
            state.selectedShow = action.payload;
            state.selectedSeats = []; // Reset seats when show changes
        },
        toggleSeat: (state, action) => {
            const seatId = action.payload;
            if (state.selectedSeats.includes(seatId)) {
                state.selectedSeats = state.selectedSeats.filter(id => id !== seatId);
            } else {
                state.selectedSeats.push(seatId);
            }
        },
        confirmBooking: (state, action) => {
            const { movie, show, seats, total } = action.payload;
            state.bookings.push({
                id: Date.now(),
                date: new Date().toISOString(),
                movie,
                show,
                seats,
                total
            });
            state.selectedSeats = [];
            state.selectedShow = null;
        }
    }
});

export const { selectShow, toggleSeat, confirmBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
