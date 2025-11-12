'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: "When should my baby start wearing Attipas Shoes ",
            answer: "Typically, babies start standing, crawling and 'cruising' around furniture (walking with the aid of chairs and tables) around the 6-8 month mark, so we recommend wearing Attipas shoes from 6 months of age."
        },
        {
            id: 2,
            question: "What sizes of Attipas shoes should I buy?",
            answer: "Attipas Baby Shoes come in six sizes (S-XXXL), and Attipas Kids Mesh Shoes come in six sizes (US7-12). We recommend using our easy, printable size guide to measure your baby or child's feet prior to buying Attipas shoes. Refer to our size guide page."
        },
        {
            id: 3,
            question: "What are the key benefits of Attipas Baby Shoes?",
            answer: "The five key benefits of wearing Attipas shoes include:\n\n• Convenience: Strong, Smooth, Non-Slip, Machine Washable, Fast-Drying\n• Breathable: Superior, breathable fine holes release heat (International Patent)\n• Big Toe Box: Free toe movement to improve cognitive and motor development\n• Safety: Non use of hazardous materials and adhesives, no use of formaldehyde\n• Lightweight & Flexible: Super lightweight, just like wearing socks!"
        },
        {
            id: 4,
            question: "How do I care for and clean Attipas shoes?",
            answer: "Attipas shoes are fully machine washable to 30 degrees celsius. Please use a laundry bag to preserve the fabric and air-dry only (avoid the dryer). Attipas shoes can be washed with your regular loads so no need for separate washes!"
        },
        {
            id: 5,
            question: "Can Attipas shoes be worn both indoors and outdoors?",
            answer: "Yes, absolutely! Attipas shoes can be worn indoor or outdoors and are fully machine washable. Avoid wet surfaces as Attipas shoes contain fine holes on the sole for breathability."
        },
        {
            id: 6,
            question: "Do I need to wear socks with Attipas Baby Shoes?",
            answer: "No, socks are not required as Attipas shoes are fully lined with a cotton blend sock. However feel free to wear socks if you require more warmth in the cooler months."
        },
        {
            id: 7,
            question: "When should my child start wearing Attipas Kids Mesh Shoes?",
            answer: "Attipas Kids Mesh Shoes are designed for older toddlers, preschoolers and children from US 7-12. They are the perfect choice of kids shoes once toddlers have  graduated from Attipas baby shoes. Free insoles are included with Kids Mesh Shoes."
        }
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-10 md:py-20 bg-gray-50">
            <div className="container">
                <div className="flex flex-col items-center text-center mb-4" >
                    <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xs font-medium uppercase tracking-widest mb-5 ">
                        Frequently Asked Questions
                    </p>
                </div >
                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        // shadow - [inset_0_4px_8px_rgba(0, 0, 0, 0.1)]
                        <motion.div
                            key={faq.id}
                            className="bg-white rounded-xl border border-border overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                className="w-full px-6 py-2 md:py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="text-sm md:text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>



        </section>
    );
};


export default FAQ;