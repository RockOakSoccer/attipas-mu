'use client'

import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-12 md:pb-24">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
                }} />
            </div>

            <div className="container relative">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                        Experience Attipas
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover how our innovative baby shoes support your little one&apos;s natural development
                    </p>
                </div>

                {/* Video Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Video Wrapper with Shadow and Border */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm border border-white/20">
                        {/* Video Element */}
                        <div className="relative aspect-video">
                            <video
                                ref={videoRef}
                                loop
                                autoPlay
                                muted={isMuted}
                                className="w-full h-full object-cover"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src={`${BASE_URL}/videos/branding.mp4`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Video Overlay Controls */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={togglePlay}
                                            className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm cursor-pointer h-8 w-8 md:h-auto md:w-auto p-1 md:p-2"
                                        >
                                            {isPlaying ? <Pause className="h-3 w-3 md:h-4 md:w-4" /> : <Play className="h-3 w-3 md:h-4 md:w-4" />}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={toggleMute}
                                            className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm cursor-pointer h-8 w-8 md:h-auto md:w-auto p-1 md:p-2"
                                        >
                                            {isMuted ? <VolumeX className="h-3 w-3 md:h-4 md:w-4" /> : <Volume2 className="h-3 w-3 md:h-4 md:w-4" />}
                                        </Button>
                                    </div>

                                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 md:px-3">
                                        <span className="text-xs md:text-sm font-medium text-gray-900">Attipas | Mauritius</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6">
                        Ready to give your baby the best start in their walking journey?
                    </p>
                    <Button asChild size="lg" className="px-9 uppercase bg-[#d68972] hover:bg-[#d68972]/80">
                        <Link href="/collections/all-products">Shop Now</Link >
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default VideoSection;
