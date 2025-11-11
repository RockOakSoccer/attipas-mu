"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";

const NewArrivalSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

    return (
        <section ref={sectionRef} className="relative w-full h-[500px] md:h-[700px] overflow-hidden my-8 md:my-16">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/branding/Fox_set_07.webp`}
                    alt="Clothing rack with natural lighting, representing the Coastal breeze collection"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
            </motion.div>
            <div className="container relative h-full flex items-start justify-start pt-0 md:pt-0 md:items-center">
                <motion.div
                    style={{ y: contentY }}
                    className="bg-white/80 backdrop-blur-sm p-5 w-[80%] max-w-[260px] md:p-12 md:w-full md:max-w-[480px] flex flex-col items-start"
                >
                    <h2 className="font-display text-[20px] leading-tight md:text-[56px] md:leading-[1.1] font-semibold text-[#2B2B2B]">
                        My Precious Friend’s Step
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-text-secondary">
                        The Barefoot Concept Range Expert-recommended for steps that mimic natural walking
                    </p>
                    <Button asChild size="lg" className="mt-8 px-9 uppercase bg-[#d68972] hover:bg-[#d68972]/80">
                        <Link href="/collections/new-collection">Shop New Arrival</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default NewArrivalSection;