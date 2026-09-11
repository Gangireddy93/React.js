import { useState } from "react";
import SampleCard from "./SampleCard";

function Sample() {
  let obj = [
    { products: "Mobile", price: 50000, color: "blue", inches: 6.9 },
    { products: "Mobile", price: 50000, color: "blue", inches: 6.7 },
    { products: "Mobile", price: 1400000, color: "pink", inches: 6.7 },
    { products: "Laptop", price: 1400000, color: "red", inches: 6.8 },
    { products: "Mobile", price: 70000, color: "Light Gold", inches: 6.7 },
    { products: "laptop", price: 100000, color: "sky blue", inches: 6.8 },
  ];
  const [product1, setproducts] = useState("");
  const [price, setprice] = useState("");
  const [inches, setinches] = useState("");
  const [color, setcolor] = useState("");
  const [image, setimage] = useState("");

  // sm={ product1:"", price:"", color:"", inches:"" }
  const [all, setAll] = useState(obj);

  // const [newall,setnewall]=useState([])
  const [filter1, setfilter1] = useState(obj);
  const [search, setsearch] = useState("");
  const filter = () => {
    const result = obj.filter((product) => {
      return product.products.toLowerCase().includes(search.toLowerCase());
    });
    // return result
    setfilter1(result);
  };

  function handelChange(e) {
    console.log("handelchange----", e.target.value);
    setproducts(e.target.value);
  }
  function handelsubmit() {
    const newObj = {
      products: product1,
      price: price,
      color: color,
      inches: inches,
      image: image,
    };

    setAll([...all, newObj]);
    setfilter1([...all, newObj]);

    setproducts("");
    setprice("");
    setinches("");
    setcolor("");
    setimage("");
  }
  return (
    <div>
      <label>Search:</label>
      <input
        type="text"
        placeholder="Enter products title"
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      <button onClick={filter}> FIlter</button>
      <br />

      <label>products:</label>
      <input
        type="text"
        placeholder="Enter your products"
        value={product1}
        onChange={handelChange}
      />
      <br />
      <label> Price :</label>
      <input
        required
        onChange={(e) => setprice(e.target.value)}
        value={price}
      />
      <br />
      <label>inches :</label>
      <input onChange={(e) => setinches(e.target.value)} value={inches} />
      <br />
      <label>Color :</label>
      <input onChange={(e) => setcolor(e.target.value)} value={color} />
      <br />
      <label>image upload:</label>
      <input
        type="file"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />

      <h4> products:{product1}</h4>
      <h4> price:{price}</h4>
      <h4> inches:{inches}</h4>
      <h4> color:{color}</h4>
      <button onClick={handelsubmit}>Submit</button>

      {filter1.map((e, index) => (
        <div key={e.products + index}>
          <SampleCard
            products={e.products}
            price={e.price}
            inches={e.inches}
            color={e.color}
          />
        </div>
      ))}
    </div>
  );
}

export default Sample;
