import { cormorantGaramond } from "@/config/fonts";

export default function AdminLoginPage() {
  return (
    <section className="flex flex-col p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16 items-center justify-center">
      <div className="flex flex-col gap-8 p-8 sm:p-12 w-full sm:w-2xl items-center justify-center rounded-2xl sm:rounded-4xl shadow border border-zinc-200 ">
        <h2
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Admin Login
        </h2>
        <div className="input-floating w-full sm:w-96">
          <input
            type="text"
            placeholder="example@example.com"
            className="input"
            id="floatingInput"
          />
          <label className="input-floating-label" htmlFor="floatingInput">
            Email
          </label>
        </div>
      </div>
    </section>
  );
}
