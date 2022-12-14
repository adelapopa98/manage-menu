import { DocumentData } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMenuItems } from "../actions/actions";
import MenuItem from "../item/MenuItem";
import './MenuItemsList.css';

const MenuItemsList = (props: {
    menuItems?: DocumentData[];
    withFetch: boolean;
    onEdit?: Function
    onDelete?: Function
}) => {
    const [menuItems, setMenuItems] = useState<DocumentData[]>([]);

    const [loading, setLoading] = useState(true);

    // Get the id param from the current URL
    const  {id} = useParams();

    useEffect(() => {
        if(props.withFetch && id) {
            fetchMenuItems(id).then((data) => {
                setMenuItems(data);
                setLoading(false);
            })
        }
    }, []);

    if(props.withFetch && loading) {
        return <div className="mt-10"> Loading... </div>
    }

    const items = props.withFetch ? menuItems : props.menuItems;

    if(!items || items.length === 0) {
        return <div className="mt-10 span-style">The menu is empty</div>
    }

    return (
        <div className="container-items">
            {items.sort((item1, item2) => (item1.price < item2.price ? -1 : 1)).map((menuItem)=> (
                <MenuItem 
                key={menuItem.id}
                id={menuItem.id}
                name={menuItem.name}
                image={menuItem.image}
                price={menuItem.price}
                description={menuItem.description}
                ingredients={menuItem.ingredients}
                category={menuItem.category}
                withControls={!props.withFetch}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                />
            ))}
        </div>
    )
}
export default MenuItemsList