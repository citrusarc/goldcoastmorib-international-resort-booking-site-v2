import { BookingEmailTemplateProps } from "@/types";

export function bookingEmailTemplate({
  logoUrl,
  firstName,
  bookingNumber,
  createdAt,
  roomName,
  checkInDate,
  checkOutDate,
  adults,
  children,
  arrivalTime,
  specialRequest,
  totalPrice,
  currency,
}: BookingEmailTemplateProps) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="text-align: center; padding: 20px;">
          <img src="${logoUrl}" alt="Hotel Logo" style="max-height: 60px; margin-bottom: 10px;" />
        </div>
        <h2>Hello ${firstName},</h2>
        <p>Thank you for your booking. Below are your booking details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td><strong>Booking Number:</strong></td><td>${bookingNumber}</td></tr>
          <tr><td><strong>Order Created:</strong></td><td>${createdAt}</td></tr>
          <tr><td><strong>Room:</strong></td><td>${roomName}</td></tr>
          <tr><td><strong>Check-in Date:</strong></td><td>${checkInDate}</td></tr>
          <tr><td><strong>Check-out Date:</strong></td><td>${checkOutDate}</td></tr>
          <tr><td><strong>Total Guests:</strong></td><td>${adults} Adult(s), ${children} Children</td></tr>
          <tr><td><strong>Arrival Time:</strong></td><td>${
            arrivalTime || "-"
          }</td></tr>
          <tr><td><strong>Special Request:</strong></td><td>${
            specialRequest || "-"
          }</td></tr>
          <tr><td><strong>Paid Amount:</strong></td><td>${currency} ${totalPrice}</td></tr>
        </table>
        <p>We look forward to welcoming you!</p>
        <footer style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} Hotel Booking. All rights reserved.
        </footer>
      </div>
    `;
}
