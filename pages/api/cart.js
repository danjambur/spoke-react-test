// we use a json file as a temporary store for our data
// it is a very basic means of storing our cart 
import cart from "./cart.json";

export default (req, res) => {
  //Each time we run this function
  //We need to reduce the cart and quantify the objects
  //So what we don't have duplicates
  //In the API response
  let quantifiedCart = cart.reduce((ar, obj) => {
    let exists = false;
    if (!ar) {
      ar = [];
    }
    ar.forEach((a) => {
      if (a.id === obj.id) {
        a.qty++;
        obj.subTotal = parseInt(obj.qty, 10) * parseInt(obj.priceRange.maxVariantPrice.amount, 10)
        exists = true;
      }
    });
    if (!exists) {
      obj.qty = 1;
      ar.push(obj);
    }
    return ar;
  }, []);

  if (req.method === "GET") {
    return res.status(200).json(quantifiedCart);
  } else if (req.method === "POST") {
    let product = JSON.parse(req.body);
    cart.push(product)
    return res.status(200).json(quantifiedCart);
  } else if (req.method === "DELETE") {
    quantifiedCart.splice(
      quantifiedCart.findIndex(function (obj) {
        return obj.id === req.body;
      }),
      1
    );
    return res.status(200).json(quantifiedCart);
    }
};
