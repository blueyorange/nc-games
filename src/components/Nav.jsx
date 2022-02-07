import { useEffect, useState } from "react";
import { getCategories } from "../api";

export default function Nav() {
    const [categories, setCategories] = useState([]);
    //const [searchTerm, setSearchTerm] = useState([]);

    useEffect(()=> {
        getCategories().then((categoriesFromApi) => {
            console.log(categoriesFromApi);
            setCategories(categoriesFromApi);
        })
    }, []);

    return (<nav className="Nav">
        <ul className="Nav__categories--list">
            {categories.map(({slug}) => 
                <li key={slug} className="Nav__categories--listitem">{slug}</li>
            )}
        </ul>
        {/* <div className="Nav__query">
        <label>
            Search<input type="text" value={searchTerm}></input>
        </label>
        in <select>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        </div> */}
        </nav>)
}