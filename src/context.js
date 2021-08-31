import React, {useState, useEffect} from 'react';
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext();
//Provider
//Consumer

const ProductProvider = (props) => {
   const [products, setProducts] = useState([])
   const [productDetail, setDetailProduct] = useState(detailProduct)
   const [cart, setCart] = useState([])
   const [modalOpen, setModalOpen] = useState(false)
   const [modalProduct, setModalProduct] = useState(detailProduct)
   const [cartSubTotal, setCartSubTotal] = useState(0)
   const [cartTax, setCartTax] = useState(0)
   const [cartTotal, setCartTotal] = useState(0)
   useEffect(() =>{
        storeProducts.forEach(item =>{
            setProducts((prev) => {
                return [item, ...prev]
            })
        })
   }, [])
   
   const getItem = id => {
       const product = products.find(item => item.id === id);
       return product;
   }
   const handleDetail = id => {
    const product = getItem(id);
    setDetailProduct(() => product)
   }
   const addToCart = id =>{
       let tempProducts = [...products];
       const index = tempProducts.indexOf(getItem(id));
       const product = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;
       setProducts(() => tempProducts) 
       setCart(() => [...cart, product])
        console.log(products, 'products')
   }
  const openModal = id => {
       const product = getItem(id);
       setModalProduct(() => product)
       setModalOpen(true)
   }
   const closeModal = () => setModalOpen(false)
   const increment = id => {
       let tempCart = [...cart];
       const selectedProduct = tempCart.find(item => item.id === id);
       const index = tempCart.indexOf(selectedProduct);
       const product = tempCart[index];
       product.count = product.count + 1;
       product.total = product.count * product.price;
       setCart([...tempCart])
   }
   const decrement = id => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if(product.count === 0){
        removeItem(id)
    }else{
        product.total = product.count * product.price
        setCart([...tempCart])
    }

   }
   const removeItem = id => {
    let tempProducts = [...products]
    let tempCart = [...cart]

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    setCart([...tempCart])
    setProducts([...tempProducts])
   }
   const clearCart = () => {
       cart.map(item => item.inCart=false)
       setCart([])
       setCartSubTotal(0)
       setCartTax(0)
       setCartTotal(0)
   }
   const addTotals = () => {
       let subTotal = 0
       cart.map(item => subTotal += item.total)
       const tempTax = subTotal * 0.04;
       const tax = parseFloat(tempTax.toFixed(2));
       const total = subTotal + tax;
       setCartSubTotal(subTotal)
       setCartTax(tax)
       setCartTotal(total)
   }
   useEffect(() => {
    addTotals()
   }, [cart])
    return (
       <ProductContext.Provider value={{
        products,
        cart,
        productDetail,
        modalOpen,
        modalProduct,
        cartSubTotal,
        cartTax,
        cartTotal,
        openModal,
        closeModal,
        handleDetail,
        addToCart,
        increment,
        decrement,
        removeItem,
        clearCart
       }}>
           {props.children}
       </ProductContext.Provider>
    );
};

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}