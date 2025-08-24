import { cormorantGaramond } from "@/config/fonts";

export default function DisclaimerPage() {
  return (
    <section className="flex flex-col p-4 sm:px-64 sm:py-24 gap-8 sm:gap-16">
      <h1
        className={`text-4xl sm:text-6xl font-semibold ${cormorantGaramond.className} text-zinc-800`}
      >
        Disclaimer
      </h1>
      <p className="text-zinc-500">
        This website site consists mainly of links to sites that cater for
        online travel bookings, hotel information and hotel review sites and as
        such these sites are out of our control and therefore the content could
        change without our knowledge. We at here therefore can bear no
        responsibility for any information, or content once the website site has
        been left. We make every endeavour to ensure that the sites we have
        chosen are reputable and of a high standard, and have implemented a
        monitoring policy to ensure that this remains the case. Please do not
        hesitate to contact us if you find one of our direct links leads to a
        site that does not fit this criteria. Should you attempt to purchase any
        product as a result of following a link from this site, we cannot be
        held liable under any circumstance for the goods, services or
        information you contract to buy. Nor can we be held responsible for
        refunds or bad debt. We are not affiliated with Hotel Official Site.
        Content posted on the site and comments posted about stories or articles
        on the site are the responsibility of the person who posted them. Our
        website is not responsible for any content that would be prohibited by
        law in the applicable jurisdiction, and will delete any content deemed
        unlawful. If you feel that inappropriate content (violation of
        intellectual property rights, copyright infringement, etc.) has been
        posted on website, please contact us and we will respond promptly and
        take action.
      </p>
    </section>
  );
}
