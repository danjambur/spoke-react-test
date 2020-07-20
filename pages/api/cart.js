// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cart from './cart.json'
export default (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json(cart)
  } else if (req.method === 'POST') {
    cart.push(req.body)
    console.log(cart);
    return res.status(200).json(cart)
    // Handle any other HTTP method
  }
}
