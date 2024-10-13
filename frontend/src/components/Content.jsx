import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Content = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider className="" {...settings}>
            <div>
                {/* <img src={assets.hero_img} alt="" />  */}

                <div className="flex flex-col sm:flex-row border h-auto  border-gray-500">
                    {/* CONTENT LEFT */}
                    <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                        <div className="text-[#414141]">
                            <div className="flex items-center gap-2">
                                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                                <p className="font-medium text-sm md:text-base">Eat Healthy</p>
                            </div>
                            <h1 className="text-3xl prata-regular sm:py-3 lg:text-5xl leading-relaxed">
                                Stay Healty
                            </h1>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm md:text-base">Shop Now</p>
                                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                            </div>
                        </div>
                    </div>
                    {/* CONTENT RIGHT */}
                    <img
                        src="https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D"
                        className="w-full sm:w-1/2 h-[31rem]"
                    />
                </div>
            </div>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1668179456564-db429f9de8e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full h-[31rem] object-cover"
                />
            </div>
            <div>
                <div className="flex flex-col sm:flex-row border border-gray-400">
                    {/* CONTENT LEFT */}
                    <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                        <div className="text-[#414141]">
                            <div className="flex items-center gap-2">
                                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                                <p className="font-medium text-sm md:text-base">Buy Now</p>
                            </div>
                            <h1 className="text-3xl prata-regular sm:py-3 lg:text-5xl leading-relaxed">
                                Ship Store
                            </h1>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm md:text-base">Shop Now</p>
                                <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                            </div>
                        </div>
                    </div>
                    {/* CONTENT RIGHT */}
                    <img src={assets.groceries} className="w-[200px] sm:w-1/2 h-[31rem]" />
                </div>
            </div>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1540340061722-9293d5163008?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full h-[31rem] object-cover"
                />
            </div>
        </Slider>
    );
};

export default Content;