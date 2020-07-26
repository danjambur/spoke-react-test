import React from "react";
import Product from "./Product";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PRODUCT } from "./Product";

const productId = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE3MDU0MjY1ODM2MjE=";

const mock = [
  {
    request: {
      query: GET_PRODUCT,
      variables: {
        id: productId,
      },
    },
    result: {
      data: {
        node: {
          id: productId,
          images: {
            edges: [
              {
                node: {
                  transformedSrc:
                    "https://cdn.shopify.com/s/files/1/0057/7260/7557/products/1.Heroes-Jade_Flat.jpg?v=1573339341",
                },
              },
            ],
          },
          priceRange: {
            maxVariantPrice: {
              amount: "44.0",
            },
          },
          productType: "Heroes",
          tags: [
            "fabric: 50% off",
            "feed",
            "hidden sale item",
            "sale",
          ],
          title: "Mint",
        },
      },
    },
  },
];

it("should render loading state initially", () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <Product />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain("Loading product...");
});
