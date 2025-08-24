import { cormorantGaramond } from "@/config/fonts";

export default function ThingsToDoPage() {
  return (
    <section className="flex flex-col p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16">
      <div>
        <h1
          className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
        >
          Things To Do Page
        </h1>
      </div>
    </section>
  );
}
