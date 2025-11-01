import { GiTakeMyMoney } from "react-icons/gi";
const Navbar = () =>{
   return(
    <div className="bg-blue-950 p-4 text-white font-medium text-xl flex items-center gap-2">
        <GiTakeMyMoney/>
        <p>Day to day Expenses</p>
    </div>
   )
};

export default Navbar;