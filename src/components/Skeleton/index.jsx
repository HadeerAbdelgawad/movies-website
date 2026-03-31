import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonLoader() {
    return (
        // SkeletonTheme بيساعدك تتحكمي في لون الـ Skeleton عشان يليق مع الـ Dark Mode بتاعك
        <SkeletonTheme baseColor="#1e293b" highlightColor="#334155">
            
            <div className="bg-[#111827] p-3 rounded-2xl border border-gray-800 shadow-lg h-full">
                
                {/* Image Placeholder */}
                <div className="relative mb-4">
                    <Skeleton height={350} className="rounded-xl" />
                </div>

                {/* Footer of the card (Title and Icons) */}
                <div className="flex justify-between items-start mb-2">
                    {/* Icon placeholder (Star) */}
                    <Skeleton circle width={20} height={20} />
                    
                    {/* Title placeholder (Right aligned to match Arabic/Design) */}
                    <div className="w-2/3 text-right">
                        <Skeleton width="100%" height={20} />
                    </div>
                </div>

                {/* Subtitle / Description placeholder */}
                <div className="flex justify-end mb-4">
                    <Skeleton width="50%" height={15} />
                </div>

                {/* Bottom row (Movie badge and Date) */}
                <div className="flex justify-between items-center mt-auto">
                     <Skeleton width={60} height={25} borderRadius={8} />
                     <Skeleton width={80} height={15} />
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default SkeletonLoader