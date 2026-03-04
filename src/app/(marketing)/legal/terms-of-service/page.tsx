import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Header } from "@/components/marketing/header";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Rules and guidelines for accessing and using our platforms.",
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <Header />
      <main
        className={cn(
          "relative mx-auto max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <MarketingHero
          badge="TERMS"
          title="Terms of Service"
          description="Read our terms carefully to understand your rights, responsibilities, and our operational guidelines."
        />
        <Article />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}

function Article() {
  return (
    <div className="relative border-b border-border">
      <FullWidthDivider position="top" />
      <article className="mx-auto max-w-2xl px-4 py-16 md:py-24 text-sm sm:text-base font-mono text-muted-foreground pb-24 text-left">
        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            1. Scope of Application
          </h2>
          <p className="leading-relaxed mb-6">
            These General Terms and Conditions (GTC) apply to all contracts
            concluded between Oskar Seeberger (hereinafter "Provider" or "we")
            and our clients (hereinafter "Client" or "you") via our services and
            products offered at www.hyeprlabs.com. Deviating conditions of the
            Client shall not be recognized unless the Provider expressly agrees
            to their validity in writing.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            2. Conclusion of Contract
          </h2>
          <p className="leading-relaxed mb-6">
            The presentation of services on our website does not represent a
            legally binding offer, but rather a non-binding online catalog. The
            contract is concluded when we accept your offer (e.g., your inquiry
            or order) by email confirmation or by performing the service.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            3. Services and Obligations to Cooperate
          </h2>
          <p className="leading-relaxed mb-6">
            The scope of contractual services results from the service
            description of the offer or contract. The Client undertakes to
            provide all cooperative acts necessary for the provision of the
            service in full and in good time. Delays attributable to a lack of
            cooperation from the Client do not fall within our area of
            responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            4. Remuneration and Terms of Payment
          </h2>
          <p className="leading-relaxed mb-6">
            Unless otherwise agreed, all prices are quoted net plus the
            applicable statutory value-added tax. Invoices are due without
            deduction within 14 days of invoicing. If the Client defaults on
            payment, we reserve the right to retain our services until payment
            has been made in full.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            5. Rights of Use and Copyright
          </h2>
          <p className="leading-relaxed mb-6">
            We grant the Client the rights of use to our work results required
            for the contractually intended purpose (essentially a simple and
            non-transferable right). The granting of rights is always subject to
            the condition precedent of full payment of the agreed remuneration.
            Source codes and working files remain with us unless expressly
            agreed otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            6. Limitation of Liability
          </h2>
          <p className="leading-relaxed mb-6">
            We bear unlimited liability for intent and gross negligence as well
            as in the event of injury to life, body and health. In the case of
            slight negligence, we are only liable for the breach of an essential
            contractual obligation (cardinal duty), the fulfillment of which is
            essential for the proper execution of the contract. Liability for
            slight negligence is limited to typical, foreseeable damage. Any
            further liability for damages – irrespective of the legal nature of
            the asserted claim – is excluded.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            7. Confidentiality
          </h2>
          <p className="leading-relaxed mb-6">
            Both parties undertake to treat strictly confidentially all
            confidential information of the other party obtained within the
            framework of the cooperation, even after termination of the
            contract, and not to disclose it to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-sm sm:text-base font-semibold text-foreground font-sans uppercase tracking-widest">
            8. Final Provisions
          </h2>
          <p className="leading-relaxed mb-6">
            The laws of the Federal Republic of Germany shall apply, excluding
            the UN Convention on Contracts for the International Sale of Goods
            (CISG). The exclusive place of jurisdiction for all disputes arising
            from or in connection with this contract is our registered office
            (Berlin), provided the Client is a merchant, a legal entity under
            public law, or a special fund under public law.
          </p>
          <p className="leading-relaxed mb-6">
            Should individual provisions of these GTC be or become invalid, the
            validity of the remaining provisions shall remain unaffected.
          </p>
        </section>
      </article>
    </div>
  );
}
