// ============================================================
// Legal pages — Privacy Policy & Terms of Service
//
// DRAFT starting text, tailored to what Track the Magic actually does
// (email accounts, user-created trip/rating data, Supabase + Resend +
// Vercel, no analytics/ads, no data sales). Before publishing, review
// with a lawyer or a reputable generator and fill in every [BRACKETED]
// placeholder:
//   [OPERATOR NAME]   — the person/company that runs the app
//   [CONTACT EMAIL]   — a mailbox you actually monitor (e.g. privacy@trackthemagic.com)
//   [JURISDICTION]    — the state/country whose law governs (e.g. "the State of Florida, USA")
// Keep LAST_UPDATED current whenever you change these documents.
// ============================================================

const GREEN     = '#1D9E75'
const HAIRLINE  = '1px solid #E7E5E0'
const LAST_UPDATED = 'July 11, 2026'

const OPERATOR    = '[OPERATOR NAME]'
const CONTACT     = '[CONTACT EMAIL]'
const JURISDICTION = '[JURISDICTION]'

// ── Logo mark (matches auth/landing) ────────────────────────────────────────
function LogoMark({ size = 32 }) {
  const inner = Math.round(size * 0.5)
  return (
    <div
      className="rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        width: size, height: size,
        background: 'linear-gradient(145deg, #1D9E75 0%, #13855f 100%)',
        boxShadow: '0 4px 14px rgba(29,158,117,0.25)',
      }}
    >
      <svg width={inner} height={inner} viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3 C18 3 19.5 12.5 24.5 17.5 C19.5 17.5 19.5 17.5 24.5 17.5 C19.5 22.5 18 33 18 33 C18 33 16.5 22.5 11.5 17.5 C16.5 17.5 16.5 17.5 11.5 17.5 C16.5 12.5 18 3 18 3Z"
          fill="white" fillOpacity="0.95"
        />
        <circle cx="27" cy="9" r="2.2" fill="white" fillOpacity="0.55" />
        <circle cx="9" cy="27" r="1.5" fill="white" fillOpacity="0.38" />
      </svg>
    </div>
  )
}

// ── Shared shell ────────────────────────────────────────────────────────────
function LegalShell({ title, children }) {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF9' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 720 }}>
        <nav className="flex items-center justify-between pt-6">
          <a href="/" className="flex items-center gap-2.5 active:opacity-60" style={{ transition: 'opacity 0.2s ease' }}>
            <LogoMark />
            <span className="text-[15px] font-bold text-gray-900">Track the Magic</span>
          </a>
          <a href="/" className="text-[14px] font-semibold text-gray-500 active:opacity-60">Back to app</a>
        </nav>

        <div className="pt-12 pb-20">
          <h1 className="text-gray-900 font-bold leading-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 34px)', letterSpacing: '-0.025em' }}>
            {title}
          </h1>
          <p className="text-gray-400 text-[13px] mt-2">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 flex flex-col gap-7">
            {children}
          </div>

          <p className="text-[12px] text-gray-400 leading-relaxed mt-12 pt-6" style={{ borderTop: HAIRLINE }}>
            Track the Magic is an independent, fan-made project. It is not affiliated with,
            authorized, endorsed by, or in any way officially connected to The Walt Disney
            Company or any of its subsidiaries or affiliates. All Disney park, attraction, and
            character names are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ heading, children }) {
  return (
    <section>
      <h2 className="text-gray-900 font-bold text-[17px] leading-snug mb-2">{heading}</h2>
      <div className="flex flex-col gap-3 text-[14px] text-gray-600 leading-relaxed">{children}</div>
    </section>
  )
}

function Bullets({ items }) {
  return (
    <ul className="flex flex-col gap-1.5 pl-1">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: GREEN }} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

// ── Privacy Policy ──────────────────────────────────────────────────────────
export function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy Policy">
      <Section heading="1. Who we are">
        <p>
          Track the Magic (&ldquo;we,&rdquo; &ldquo;us,&rdquo; the &ldquo;Service&rdquo;) is operated by {OPERATOR}.
          This policy explains what personal information we collect, how we use it, and the
          choices you have. Questions? Contact us at {CONTACT}.
        </p>
      </Section>

      <Section heading="2. Information we collect">
        <p>We collect only what we need to run the Service:</p>
        <Bullets items={[
          'Account information: your email address and a securely hashed password (we never see your plain-text password — it is handled by our authentication provider).',
          'Content you create: the trips, visit dates, park selections, experiences you mark as done, personal ratings, wishlist flags, notes, and challenge progress you enter.',
          'Essential technical data: a login session token stored on your device so you stay signed in. We do not use advertising or analytics trackers.',
        ]} />
      </Section>

      <Section heading="3. How we use your information">
        <Bullets items={[
          'To provide and maintain your account and save your tracking data.',
          'To authenticate you and keep your account secure.',
          'To send you account-related emails (such as email confirmation and password resets).',
          'To calculate anonymous, aggregated community averages (for example, an average star rating for an attraction). These aggregates never identify individual users.',
        ]} />
      </Section>

      <Section heading="4. Legal bases (EU/UK users)">
        <p>
          Where the GDPR/UK GDPR applies, we process your data to perform our contract with you
          (providing the Service), on the basis of your consent (which you give at sign-up), and
          for our legitimate interests in operating and securing the Service.
        </p>
      </Section>

      <Section heading="5. How we share information">
        <p>We do not sell your personal information, and we do not share it for advertising. We use a small number of service providers that process data on our behalf:</p>
        <Bullets items={[
          'Supabase — database, authentication, and hosting of your account and tracking data.',
          'Resend — delivery of transactional account emails.',
          'Vercel — hosting of the web application.',
        ]} />
        <p>We may also disclose information if required by law or to protect the rights, safety, and security of our users and the Service.</p>
      </Section>

      <Section heading="6. Cookies and local storage">
        <p>
          We use only strictly necessary browser storage to keep you signed in. We do not use
          advertising cookies or third-party tracking cookies, so no cookie-consent banner is
          required for the current Service. If we ever add analytics or advertising, we will
          update this policy and request consent where required.
        </p>
      </Section>

      <Section heading="7. Data retention">
        <p>
          We keep your information for as long as your account is active. When you delete your
          account, your personal data and all associated tracking content are permanently removed
          from our active systems, subject to short-lived backups that age out on a rolling basis.
        </p>
      </Section>

      <Section heading="8. Your rights and choices">
        <p>You can access and update most of your information directly in the app. You may also:</p>
        <Bullets items={[
          'Delete your account and all associated data at any time from the Profile screen, or by emailing ' + CONTACT + '.',
          'Request a copy of the personal data we hold about you.',
          'Ask us to correct inaccurate information.',
        ]} />
        <p>
          California residents have rights under the CCPA/CPRA (including the right to know, delete,
          and not be discriminated against for exercising those rights). EU/UK residents have rights
          under the GDPR (including access, rectification, erasure, restriction, portability, and
          objection). To exercise any of these, contact {CONTACT}.
        </p>
      </Section>

      <Section heading="9. Children's privacy">
        <p>
          The Service is not directed to children under 13, and you must be at least 13 years old to
          create an account. We do not knowingly collect personal information from children under 13.
          If we learn that we have collected such information, we will delete it promptly. If you
          believe a child under 13 has provided us information, contact {CONTACT}.
        </p>
      </Section>

      <Section heading="10. Security">
        <p>
          We protect your data with encryption in transit, hashed passwords, and database access
          rules that restrict each account to its own data. No method of transmission or storage is
          100% secure, but we work to protect your information and to promptly address any issues.
        </p>
      </Section>

      <Section heading="11. International data transfers">
        <p>
          Our providers process and store data in the United States. If you access the Service from
          outside the U.S., you understand your information will be processed in the U.S., where data
          protection laws may differ from those in your country.
        </p>
      </Section>

      <Section heading="12. Changes to this policy">
        <p>
          We may update this policy from time to time. When we do, we will revise the &ldquo;Last
          updated&rdquo; date above, and for material changes we will provide additional notice where
          appropriate.
        </p>
      </Section>

      <Section heading="13. Contact us">
        <p>Questions or requests about your privacy? Email {CONTACT}.</p>
      </Section>
    </LegalShell>
  )
}

// ── Terms of Service ────────────────────────────────────────────────────────
export function TermsOfService() {
  return (
    <LegalShell title="Terms of Service">
      <Section heading="1. Agreement to these terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are a legal agreement between you and {OPERATOR}
          (&ldquo;we,&rdquo; &ldquo;us&rdquo;) governing your use of Track the Magic (the &ldquo;Service&rdquo;).
          By creating an account or using the Service, you agree to these Terms and to our Privacy Policy.
          If you do not agree, do not use the Service.
        </p>
      </Section>

      <Section heading="2. Eligibility">
        <p>
          You must be at least 13 years old to use the Service. By using it, you represent that you
          are 13 or older and that the information you provide is accurate.
        </p>
      </Section>

      <Section heading="3. The Service">
        <p>
          Track the Magic is a personal tracker for theme-park experiences. It lets you log visits,
          mark experiences as completed, rate them, keep notes, and follow challenges. Park and
          attraction information is provided for convenience and may be incomplete or out of date; we
          do not guarantee its accuracy.
        </p>
      </Section>

      <Section heading="4. Your account">
        <p>
          You are responsible for keeping your login credentials confidential and for all activity
          under your account. Notify us at {CONTACT} if you suspect unauthorized use. We may suspend
          or terminate accounts that violate these Terms.
        </p>
      </Section>

      <Section heading="5. Acceptable use">
        <p>You agree not to:</p>
        <Bullets items={[
          'Use the Service for any unlawful purpose or in violation of these Terms.',
          'Attempt to access other users’ data, probe or breach security, or disrupt the Service.',
          'Scrape, harvest, reverse engineer, or copy the Service except as permitted by law.',
          'Upload content that is illegal, infringing, or abusive.',
        ]} />
      </Section>

      <Section heading="6. Your content">
        <p>
          You own the content you create (your trips, ratings, notes, and progress). You grant us a
          limited license to store, process, and display that content solely to operate and provide
          the Service to you. You are responsible for the content you enter.
        </p>
      </Section>

      <Section heading="7. Community ratings">
        <p>
          Your individual ratings may be combined with those of other users to display anonymous,
          aggregated averages. These aggregates do not identify you.
        </p>
      </Section>

      <Section heading="8. Not affiliated with Disney">
        <p>
          Track the Magic is an independent, fan-made project. It is not affiliated with, authorized,
          endorsed by, or in any way officially connected to The Walt Disney Company or any of its
          subsidiaries or affiliates. All Disney park, resort, attraction, and character names and
          related marks are the property of their respective owners and are used for identification
          and reference only.
        </p>
      </Section>

      <Section heading="9. Fees and paid plans">
        <p>
          The Service is currently free during early access. We may introduce paid plans in the
          future. If we do, the price, billing period, renewal terms, and cancellation instructions
          will be clearly disclosed to you before you are charged, and any recurring subscription
          will be subject to those additional terms and to applicable automatic-renewal laws.
        </p>
      </Section>

      <Section heading="10. Intellectual property">
        <p>
          The Service itself — including its software, design, and original content — belongs to us
          and is protected by intellectual-property laws. These Terms do not grant you any right to
          our trademarks or branding.
        </p>
      </Section>

      <Section heading="11. Disclaimers">
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any
          kind, whether express or implied, including fitness for a particular purpose and
          non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or
          that park information will be accurate.
        </p>
      </Section>

      <Section heading="12. Limitation of liability">
        <p>
          To the fullest extent permitted by law, we will not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or for any loss of data or profits, arising
          from your use of the Service. Our total liability for any claim relating to the Service will
          not exceed the greater of the amount you paid us in the 12 months before the claim or USD $50.
        </p>
      </Section>

      <Section heading="13. Indemnification">
        <p>
          You agree to indemnify and hold us harmless from claims arising out of your misuse of the
          Service or violation of these Terms.
        </p>
      </Section>

      <Section heading="14. Termination">
        <p>
          You may stop using the Service and delete your account at any time. We may suspend or
          terminate access if you violate these Terms or if we discontinue the Service.
        </p>
      </Section>

      <Section heading="15. Changes to these terms">
        <p>
          We may update these Terms from time to time. Material changes will be reflected in the
          &ldquo;Last updated&rdquo; date, and continued use of the Service after changes take effect
          constitutes acceptance.
        </p>
      </Section>

      <Section heading="16. Governing law">
        <p>
          These Terms are governed by the laws of {JURISDICTION}, without regard to conflict-of-laws
          principles. Any disputes will be handled in the courts located there, unless applicable law
          requires otherwise.
        </p>
      </Section>

      <Section heading="17. Contact">
        <p>Questions about these Terms? Email {CONTACT}.</p>
      </Section>
    </LegalShell>
  )
}
