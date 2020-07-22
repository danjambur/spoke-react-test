// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cart from "./cart.json";
export default (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json(cart);
  } else if (req.method === "POST") {
    let product = JSON.parse(req.body);

    cart.push(JSON.stringify(product));
    
  } else if (req.method === "DELETE") {
    cart.splice(
      cart.findIndex(function (obj) {
        return JSON.parse(obj).id === req.body;
      }),
      1
    );
    return res.status(200).json(cart);
  }
};
