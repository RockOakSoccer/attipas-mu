'use client'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";
import ContactSupport from "@/components/ContactSupport";

export default function SizeGuidePage() {
    return (
        <div className="">
            <Nav />

            <main className="w-full">
                {/* Hero Section */}
                <section className="bg-background-light-grey py-16 px-6">
                    <div className="container max-w-4xl mx-auto text-center">
                        <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                            Size Guide
                        </h2>
                        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                            Please use the below size guide when purchasing Attipas toddler shoes or Attipas Kids Mesh Shoes
                        </p>
                        <Button
                            className="mt-6 bg-accent-blue-grey hover:bg-accent-blue-grey-dark text-white"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/images/foot-sizing.jpg';
                                link.download = 'Attipas-Size-Guide.jpg';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Free Size Guide
                        </Button>
                    </div>
                </section>

                {/* Size Chart Section */}
                <section className="py-16 px-6">
                    <div className="container max-w-5xl mx-auto">
                        <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                            Baby & Kids Shoe Size Chart
                        </h2>

                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-accent-blue-grey text-white">
                                        <th className="py-4 px-6 text-left font-semibold">Size (EUR)</th>
                                        <th className="py-4 px-6 text-left font-semibold">Size (mm)</th>
                                        <th className="py-4 px-6 text-left font-semibold">Foot Length (mm)</th>
                                        <th className="py-4 px-6 text-left font-semibold">Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">19</td>
                                        <td className="py-4 px-6">108</td>
                                        <td className="py-4 px-6">96 ~ 108</td>
                                        <td className="py-4 px-6">3-7 months</td>
                                    </tr>
                                    <tr className="border-b hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">20</td>
                                        <td className="py-4 px-6">115</td>
                                        <td className="py-4 px-6">109 ~ 115</td>
                                        <td className="py-4 px-6">6-12 months</td>
                                    </tr>
                                    <tr className="border-b hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">21.5</td>
                                        <td className="py-4 px-6">125</td>
                                        <td className="py-4 px-6">116 ~ 125</td>
                                        <td className="py-4 px-6">1-2 years</td>
                                    </tr>
                                    <tr className="border-b hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">22.5</td>
                                        <td className="py-4 px-6">135</td>
                                        <td className="py-4 px-6">126 ~ 135</td>
                                        <td className="py-4 px-6">1.5-2.5 years</td>
                                    </tr>
                                    <tr className="border-b hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">24</td>
                                        <td className="py-4 px-6">145</td>
                                        <td className="py-4 px-6">136 ~ 145</td>
                                        <td className="py-4 px-6">2-3 years</td>
                                    </tr>
                                    <tr className="hover:bg-background-light-grey transition-colors">
                                        <td className="py-4 px-6 font-medium">25.5</td>
                                        <td className="py-4 px-6">155</td>
                                        <td className="py-4 px-6">146 ~ 155</td>
                                        <td className="py-4 px-6">2.5-3.5 years</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 p-4 bg-background-light-grey rounded-lg">
                            <p className="text-sm text-text-secondary italic text-center">
                                * By size, we have given an indication of the age and shoe size in the table above. Please note that this is only an indication.
                                We&apos;d like you to measure your child&apos;s foot and find the correct size in the charts above.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How to Measure Section */}
                <section className="py-16 px-6">
                    <div className="container max-w-5xl mx-auto">
                        <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                            How to Measure Your Child&apos;s Feet
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                <p className="text-text-secondary leading-relaxed">
                                    Want to make sure you choose the perfect size for your precious little one&apos;s feet? Make sure to use our baby and kids shoe size chart.
                                </p>
                                <p className="text-text-secondary leading-relaxed">
                                    Remember that every little one&apos;s feet grows at different speeds, so we highly recommend you measure those wigglies!
                                </p>

                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-text-primary mb-4">Step-by-Step Guide:</h3>
                                    <ol className="space-y-3 list-decimal list-inside text-text-secondary">
                                        <li>Stand your child on a piece of paper and trace the outline of your child&apos;s foot.</li>
                                        <li>Use a ruler to measure the length of your child&apos;s foot from the longest toe (usually the big toe, but depends on the foot) to the back of your child&apos;s heel.</li>
                                        <li>Write down the measurement.</li>
                                        <li>Make sure that each foot is fully extended and double-check that your child&apos;s toes aren&apos;t curled.</li>
                                        <li>Compare your child&apos;s foot measurements to our shoe size chart to find the size that corresponds to your child&apos;s foot size.</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden">
                                    <Image
                                        src="/images/foot-sizing.jpg"
                                        alt="How to measure baby foot size"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <div className="container max-w-5xl mx-auto">
                    <FAQ />
                </div>
                {/* CTA Section */}
                <ContactSupport title="Need Help Finding the Right Size?" description="Our customer service team is here to help you find the perfect fit for your little one" buttonText="Contact Customer Service" />
            </main>

            <Footer />
        </div>
    );
}