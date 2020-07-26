// we use a json file as a temporary store for our data
// it is a very basic means of storing our cart
import cart from "./cart.json";

export default (req, res) => {
  function getSubtotal(obj) {
    return (obj.subTotal =
      parseInt(obj.qty, 10) *
      parseInt(obj.priceRange.maxVariantPrice.amount, 10));
  }

  // there is (unfortunately) a bug that i cannot solve right now;
  // where - on first POST, the cart data is updated - and reduced.
  // but on the first GET, the cart - remains empty - i believe this is due to the cart being statically generated
  // as, accessing the cart page before adding products - does not result in this bug.

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
        getSubtotal(a);
        exists = true;
      }
    });
    if (!exists) {
      obj.qty = 1;
      getSubtotal(obj);
      ar.push(obj);
    }
    return ar;
  }, []);

  function removeItem(arr, req) {
    arr.splice(
      arr.findIndex(function (obj) {
        return obj.id === req.body;
      }),
    );
  }

  if (req.method === "GET") {
    return res.status(200).json(quantifiedCart);
  } else if (req.method === "POST") {
    let product = JSON.parse(req.body);
    cart.push(product);
    return res.status(200).json(quantifiedCart);
  } else if (req.method === "DELETE") {
    // we remove the item from each cart array
    // so we maintain an accurate view of the quantifiedCart
    removeItem(quantifiedCart, req);
    removeItem(cart, req);
    return res.status(200).json(quantifiedCart);
  }
};
