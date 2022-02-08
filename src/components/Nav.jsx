import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "../api";


export default function Nav() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const setSearchParams = useSearchParams()[1];

    useEffect(()=> {
        getCategories().then((categoriesFromApi) => {
            setCategories(categoriesFromApi);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const category = e.target.category.value;
        setSearchParams({category, searchTerm});
    }

    return (<nav className="Nav">
        <ul className="Nav-ul_categories">
            {categories.map(({slug}) => 
                <li key={slug} className="Nav-li_categories">{slug}</li>
            )}
        </ul>
        <form className="Nav-form_query" onSubmit={handleSubmit}>
        <label>
        <button>Search</button>
            <input name="searchTerm" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
        </label>
        in <select name="category" id="categorySelector">
            {categories.map(({slug}) => {
            return (<option key={slug} value={slug}>{slug}</option>)})}
        </select>
        </form>
        </nav>)
}