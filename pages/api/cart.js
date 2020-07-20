// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cart from "./cart.json";
export default (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json(cart);
  } else if (req.method === "POST") {
    let qty = 1;
    cart.push(req.body);
    return res.status(200).json(cart);
    // Handle any other HTTP method
  }
};
