const express = require("express");
const fetch = require("node-fetch");
require('dotenv').config()

const app = express();

app.get("/shop-info", (req, res) => {
    fetch(`https://${process.env.SHOP}/admin/api/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": `${process.env.TOKEN}`
      },
      body: JSON.stringify({
        query: `{
           shop {
             name
             url
             email
             myshopifyDomain
           }
         }`
      })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log("data returned:\n", data);
        res.send(data);
      });
  });

  app.get("/products", (req, res) => {
    fetch(`https://${process.env.SHOP}/admin/api/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": `${process.env.TOKEN}`
      },
      body: JSON.stringify({
        query: `query findProducts(
          $query: 
            String!, 
            $num: Int!
            ) 
          {
           shop {
             name
           }
           products(first: $num, query: $query) {
             edges {
               cursor
               node {
                 id
                 title
                 featuredImage {
                   originalSrc
                 }
                 totalInventory
               }
             }
           }
         }`,
        variables: { query: "shirt", num: 5 }
      })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log("data returned:\n", data);
        res.send(data);
      });
  });

app.listen(3000, () => console.log("Listening on port 3000 .... "));