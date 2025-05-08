import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted p-6 flex justify-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground text-sm leading-6">
          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              1. Introduction
            </h2>
            <p>
              We are committed to protecting your personal information and your
              right to privacy. This Privacy Policy describes how we collect,
              use, and safeguard your data when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, contact details, and any other data you provide when
              contacting us or using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              3. How We Use Your Information
            </h2>
            <p>
              Your information is used to provide and improve our services,
              communicate with you, and ensure compliance with legal
              obligations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              4. Data Sharing & Security
            </h2>
            <p>
              We do not sell your personal data. We may share it with trusted
              partners or authorities when required by law. We implement
              appropriate security measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this policy occasionally. We encourage you to review
              it periodically to stay informed about how we are protecting your
              data.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-primary mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
              <br />
              <span className="text-primary">support@example.com</span>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
