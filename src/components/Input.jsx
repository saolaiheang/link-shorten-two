import React from "react";
import Btn from "./Btn";
function Input(){
    return (
        <>
        <div className="w-[50% ] h-10 flex justify-center  mt-10">
        <input
      type="text"
      placeholder="put your long link here"
      className="border-2 border-gray-300 rounded-[10px] mr-3 px-8 py-5 w-[50%]"
     />
        <Btn onClick={() => navigate('')} text="short" type="button-blues" />

        </div>
        </>
    )
}
export default Input;