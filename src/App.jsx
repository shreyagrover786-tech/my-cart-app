import {useState  , useEffect} from "react";

function App(){
  const[count,setCount] = useState(0);
  const[products, setProducts] = useState([]);
  const[cart, setCart]=useState([]);
  const[category, setCategory]=useState("all");
  
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {setProducts(data);
  });
  },[]);
  const addToCart=(product) =>{
    setCart([...cart,{...product, quantity: 1}]);
    
  };
  const removeFromCart =(product) => {
    setCart(cart.filter(item=> item.id !== product.id));
  };
  const increaseQuantity = (product) =>{
    setCart(cart.map(item =>
      item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    ));
  };
  const decreaseQuantity =(product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if(cartItem.quantity === 1) {
      removeFromCart(product);
    } else {
      setCart(cart.map(item =>
        item.id === product.id? {...item, quantity: item.quantity - 1} : item
      ));
    }
  };
  const filtered = category === "all"? products : products.filter(p => p.category === category);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total,item) => total + item.price * item.quantity, 0);
  
  const handleClick =() => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  return(
    <div>
      <h1>Hello World!</h1>
      <div>
        <button onClick ={handleClick}>
          Count{count}
        </button>
        <h2>Products From Fake Api</h2>
        <button onClick={() => setCategory("all")}>All</button>
        <button onClick={() => setCategory("men's clothing")}>Men</button>
        <button onClick={() => setCategory("women's clothing")}>Women</button>
        <button onClick={() => setCategory("electronics")}>Electronics</button>
        <button onClick={() => setCategory("jewelery")}>Jewelery</button>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
        <tbody>
        {filtered.map(product => {
          const cartItem = cart.find(item => item.id === product.id);
          return(
          <tr key={product.id}>
            <td>
            <img src={product.image} width="60" height="60"/>
            </td>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>
              {cart.find((item) => item.id === product.id) ?(
                <>
                <button onClick={() => decreaseQuantity(product)}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => increaseQuantity(product)}>+</button>
              <button onClick={() => removeFromCart(product)}>
                Remove
              </button>
              </>) : (
              <button onClick={() => addToCart(product)}>
                Add To Cart
              </button>
              )}
            </td>
            </tr>
          )
})}
        </tbody>
        </table>
        <h3>Total Items in Cart: {totalItems}</h3>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
export default App;