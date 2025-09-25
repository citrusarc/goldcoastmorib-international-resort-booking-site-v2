import Image from "next/image";

export default function TestPage() {
  return (
    <div className="flex flex-col p-24 items-center justify-center bg-gray-200">
      <div className="flex flex-col max-w-[600px] rounded-4xl overflow-hidden bg-white">
        <div className="flex flex-col gap-8 p-8">
          <Image
            priority
            src="/Images/brand-logo-horizontal.png"
            alt="Gold Coast Morib International Resort Logo"
            width={280}
            height={280}
          />
          <div className="w-full border-t border-red-500" />
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-2xl">Hey First Name!</h2>
            <div>
              <p>Packed your bags yet? Your reservation is all set. </p>
              <p>Here’s a quick look at your stay:</p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Booking Number</td>
                  <td>ABC123</td>
                </tr>
                <tr>
                  <td>Order Created</td>
                  <td>Date and Time</td>
                </tr>
                <tr>
                  <td>Room Type</td>
                  <td>Room Name</td>
                </tr>
                <tr>
                  <td>Check In</td>
                  <td>Date and Time</td>
                </tr>
                <tr>
                  <td>Check Out</td>
                  <td>Date and Time</td>
                </tr>
                <tr>
                  <td>Total Guests</td>
                  <td>2 Adults 1 Child</td>
                </tr>
                <tr>
                  <td>Early Check In</td>
                  <td>Date and Time, If not applicable just dash -</td>
                </tr>
                <tr>
                  <td>Special Request</td>
                  <td>dash - if no</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>Paid Amount:</p>
              <p className="font-semibold text-2xl">RM123.45</p>
            </div>
          </div>
        </div>
        <div className="p-8 text-center text-white bg-blue-600">
          email@example.com <br />
          +60123456789 <br />© ${new Date().getFullYear()} Gold Coast Morib
          International Resort. All rights reserved.
        </div>
      </div>
    </div>
  );
}
