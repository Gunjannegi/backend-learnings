const User = require('./users');
const Booking = require('./bookings');
const Bus = require('./buses');

User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking);
Booking.belongsTo(Bus);

module.exports = {
    User,
    Booking,
    Bus
}