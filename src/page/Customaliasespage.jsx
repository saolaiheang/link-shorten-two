import Header from "../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/Sidebar";
import Btn from "../components/Btn";
import QRCodeComponent from "../components/Responsiveqrcode";

function Customaliasespage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');

    };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                userName="Lai heang"
                profilePicUrl="https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png"
                onLogout={handleLogout}
                showLoginSignup={false} />
            <div className=" flex w-full overflow-hidden">
                <Sidebar />
                <div className="w-full h-auto">
                    <div className="w-[60%] max-sm:w-[90%] max-sm:items-center h-10 m-auto  mt-[131px]">
                        <h1 className="text-left text-[20px] py-4">Shortens a long url</h1>
                        <div className="flex gap-4 w-[100%] h-[56.1px] max-sm:h-auto  ">
                            <input
                                type="text"
                                onChange={(e) => setLongUrl(e.target.value)}
                                placeholder="Enter long URL"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[60%] "
                            />
                        </div>
                        <h1 className="text-left text-[20px] pt-8 max-sm:py-4 pb-4">Customize your link</h1>
                        <div className="flex flex-wrap max-sm:flex-col gap-[57px] max-[1000px]:gap-[20px] ">
                            <input type="text"
                                placeholder="https://link-shortener-frontend-gules.vercel.app/"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%]  h-[56.1px] max-sm:h-[56.1px] "
                                readOnly
                            />
                            <input type="text"
                                placeholder="Enter alaise"
                                className="flex-1 border-2 border-gray-300 rounded-[10px] max-sm:text-[9px] max-sm:rounded-[10px] px-2 py-2 max-sm:w-[100%]  h-[56.1px] max-sm:h-[56.1px]"

                            />


                        </div>
                        <div className="pt-[54px] text-left">
                            <Btn type="button-blues" text="Customs" />
                        </div>
                        <div className="w-full h-auto max-sm:h-auto flex max-sm:flex-col overflow-hidden justify-between bg-white shadow-lg rounded-lg p-2 max-sm:p-1 mt-[49px] border  border-gray-300">
                          <QRCodeComponent/>

                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}
export default Customaliasespage;