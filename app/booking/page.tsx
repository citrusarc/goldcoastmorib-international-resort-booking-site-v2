import Image from "next/image";

import { cormorantGaramond } from "@/config/fonts";

export default function BookingPage() {
  return (
    <section className="-mt-28 sm:-mt-40">
      <div className="relative w-full h-[640px] sm:h-[960px]">
        <Image
          fill
          src="/Images/booking-hero-banner.jpg"
          alt="Gold Coast Morib International Resort Hero Banner"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white">
          <h1 className="text-lg sm:text-xl">Your Getaway Starts Here</h1>
          <p
            className={`text-center text-4xl sm:text-6xl ${cormorantGaramond.className}`}
          >
            Your Perfect Dates <br />
            Unforgettable Funs
          </p>

          <div className="hidden sm:flex flex-col px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-start sm:items-center">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Check-in */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Check-in</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Check-out */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Check-out</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Room Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Room Type</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>Deluxe Room</option>
                    <option>Premier Twin</option>
                    <option>Family Suite</option>
                    <option>Ocean Villa</option>
                  </select>
                </div>

                {/* Guests */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Guests</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={1}
                      placeholder="Adults"
                      className="input input-bordered w-1/2"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="Kids"
                      className="input input-bordered w-1/2"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="form-control flex items-end">
                  <button className="btn btn-primary w-full border-0 bg-amber-500">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden flex flex-col px-4 py-8 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-start sm:items-center">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Check-in */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Check-in</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Check-out */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Check-out</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Room Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Room Type</span>
              </label>
              <select className="select select-bordered w-full">
                <option>Studio Suite</option>
                <option>Apartment With Balcony</option>
                <option>Family Suite</option>
                <option>2 Rooms Apartment</option>
                <option>3 Rooms Apartment</option>
                <option>Penthouse Room</option>
              </select>
            </div>

            {/* Guests */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Guests</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  placeholder="Adults"
                  className="input input-bordered w-1/2"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Kids"
                  className="input input-bordered w-1/2"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="form-control flex items-end">
              <button className="btn btn-primary w-full border-0 bg-amber-500">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
