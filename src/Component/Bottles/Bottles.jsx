import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bootles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localstorage";
import Cart from "../cart/Cart";

const Bottles = () => {
    
    const [bottles, setBottles] = useState([])
    const [cart, setCart] = useState([]) 
    console.log(cart)

    useEffect(() => {
        fetch('bottle.json')
        .then(res=> res.json())
        .then(data=> setBottles(data))
    }, [])

    // load cart from local storage 
    useEffect(() => {
       if(bottles.length){
        const storedCart = getStoredCart() ;

        const savedCart = [] ;
        for (const id of storedCart) {
            console.log(id, bottles);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                savedCart.push(bottle);
            }
        }
        setCart(savedCart);
       }
    } ,[bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart , bottle] ;
        setCart(newCart);
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        removeFromLS(id);
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);

    }



    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
         
           <div className="bottle-container">
           {
                bottles.map(bottle => <Bottle 
                bottle={bottle}
                key={bottle.id}
                handleAddToCart={handleAddToCart}
                ></Bottle>)
            }
           </div>

        </div>
    );
};

export default Bottles;