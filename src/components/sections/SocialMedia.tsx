"use client";

import { Instagram } from "lucide-react";

import { Button } from "../ui/button";

const SocialMediaSection = () => {
    return (
        <section className="bg-[#fafafa]/30  pb-10 md:pb-20 overflow-hidden">
            <div className="container">
                <div className="relative min-h-[200px] ">
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">
                            Follow Us
                        </p>
                        <h2 className="font-display text-[20px] md:text-[36px] font-semibold text-primary mb-8 leading-tight">
                            We&apos;re Attipas MU
                            <br />
                            on Instagram
                        </h2>
                        <Button
                            variant="coral"
                            className=" w-[150px] cursor-pointer pointer-events-auto"
                            asChild
                        >
                            <a href="https://www.instagram.com/attipasmauritius/" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-4 h-4" />
                                <span>@attipas_mu</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialMediaSection;
