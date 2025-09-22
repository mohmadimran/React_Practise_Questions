import { useState } from "react";

 const data = {
    India: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      Texas: ["Houston", "Dallas", "Austin"],
    },
    Canada: {
      Ontario: ["Toronto", "Ottawa", "Hamilton"],
      Quebec: ["Montreal", "Quebec City", "Laval"],
    },
  };

export default function MultiDropDownMenu(){
    const [countries, setCountires] = useState("")
    const [state,setState] = useState("")
    const [ city, setCity] = useState("")

    return(
        <>
<div>
    <select value={countries} onChange={(e)=>setCountires(e.target.value)}>
        <option>select countries</option>
        <option>a</option>
        <option>b</option>
    </select>
</div>

        </>
    )
}