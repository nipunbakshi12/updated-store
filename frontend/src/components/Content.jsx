import React, { useEffect } from "react";
import { assets } from "../assets/assets";

const Content = () => {


    return (
        <div className="flex flex-col sm:flex-row border border-gray-400">
            {/* LEFT SIDE */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="font-medium text-sm md:text-base">OUR FRESH PICKS</p>
                    </div>
                    <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">NEWLY STOCKED</h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">ORDER NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>
            {/* RIGHT SIDE */}
            <img className="w-full sm:w-1/2" src={assets.hero_img2} />
        </div>
    );
};

export default Content;
