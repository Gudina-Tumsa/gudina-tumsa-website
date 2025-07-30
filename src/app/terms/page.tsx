import React from 'react';
import Header from "@/components/layout/Header";


const Index = () => {
    return (
        <div className="min-h-screen  text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        GTL Terms of Service
                    </h1>
                    <p className="text-lg mb-4">
                        Welcome to GTL’s Terms of Service (the “TOS”). These TOS set out the legal basis for your use of GTL's services and we want you to know your and our rights before you use the GTL website or Services.
                    </p>
                    <p className="text-lg mb-4">
                        This policy is designed to provide transparency into our privacy practices and principles
                        in a format you can navigate, read, and understand easily.
                    </p>
                    <p className="text-lg">
                        We commit to treating your personal information with care and respect and encourage you
                        to contact us using the methods provided below should you have any questions or concerns.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">The Scope of this Policy</h2>
                    <p className="text-lg mb-4">
                        This Policy describes the processing of personal information provided or collected on our
                        sites, applications, products or services. In some instances, we may provide additional
                        data privacy notices specific to certain products, practices, or regions. Those terms
                        should be read in conjunction with this policy.
                    </p>
                    <p className="text-lg mb-4">
                        If you provide information to us on a third-party site or platform, the information you
                        provide may be separately collected by the third-party site or platform. That third-party
                        site or platform’s privacy practices will govern the use of your information. Choices you
                        make on that third-party platform will not apply to our use of the information we have
                        collected through our sites, products, or services.
                    </p>
                    <p className="text-lg">
                        We acknowledge our obligations to all recipients of our products and services, including
                        visitors to our website, our registered users and administrators of our products and
                        services on behalf of our customers to collect, manage, process, and use their personal
                        information (“Personal Data”) in accordance with the laws and regulations of each of the
                        countries in which we operate.
                    </p>
                    <p className="text-lg mt-4">
                        With the term ‘applicable data protection law’ (or ‘applicable law’) we mean any data
                        protection law that is applicable at your location, e.g. the GDPR when you are located in
                        the EU/EEA. Any reference to the ‘GDPR’ means the European General Data Protection
                        Regulation but also implicitly includes the corresponding regulation of the United Kingdom,
                        in which the European GDPR has been implemented into national law (UK GDPR).
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">Information Collected or Processed</h2>
                    <p className="text-lg mb-4">
                        GTL may have collected or processed the categories of Personal Data that are identified
                        below. We generally collect the information listed below to secure, improve, and provide
                        our services to our customers.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                        <li>Identifiers such as a real name, alias, postal address, unique personal identifier, online identifier, IP address, email address, account name, or similar.</li>
                        <li>Customer records: name, credit card or debit card number, payment information, or subscription details.</li>
                        <li>Internet or other electronic network activity: browsing history, search history, and interaction data.</li>
                        <li>Geolocation data.</li>
                        <li>Professional or employment-related information.</li>
                        <li>Education information.</li>
                        <li>Content you provide while using our features and products (e.g. input to AI, chat messages).</li>
                        <li>Video recordings of your voice or image during webinars or live sessions (if you enable your camera).</li>
                        <li>Inferences drawn from any of the above to reflect your preferences, characteristics, and behavior.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Index;
