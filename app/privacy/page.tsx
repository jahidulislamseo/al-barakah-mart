export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 5, 2024</p>

            <div className="prose prose-gray max-w-none space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Welcome to Al Barakah Mart. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Data</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Security</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Contact Details</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <br /><br />
                        <strong>Email:</strong> privacy@albarakah.com<br />
                        <strong>Address:</strong> House #123, Road #4, Dhanmondi, Dhaka-1209, Bangladesh
                    </p>
                </section>
            </div>
        </div>
    )
}
