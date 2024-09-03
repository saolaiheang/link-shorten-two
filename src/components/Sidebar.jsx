import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Shortens Links", src: "Shortens Links" },
    { title: "Dash Boards", src: "Dash Boards", gap: true },

  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-slate-200 h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQ34x-FzmkmTADmbNeHmQ74N097sBj5p7iw&s"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQE55kHfjFuzlg/company-logo_200_200/company-logo_200_200/0/1631377740362?e=2147483647&v=beta&t=lwTHSGTyiLNCxcgBP36R49o1XEATmojFUK8g27vK0BY"
            className={`rounded-full w-12 sm:w-14 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            BiKay
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-violet-200 text-black text-base items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              }`}
            >
              <img src={`/assets/${Menu.src}.svg`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
