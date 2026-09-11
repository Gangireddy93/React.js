import "./Style.css"
import Import  from "./Import"
function sample({ products, price, color, inches,image }) {
  console.log("names-----", products, price, color, inches,image);
  return (
    <div className="get">
      <h1>Products:{products}</h1>
      <h1>Price:{price}</h1>
      <h1>color:{color}</h1>
      <h1>inches:{inches}</h1>
      <h1>image:{image}</h1>

  
    </div>
    
  );
}
export default sample;
