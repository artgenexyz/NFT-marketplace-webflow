# NFT-marketplace-webflow

## How to connect?

1. Use this code for custom code block in Webflow
```html
<script>
// Put your Webflow / WordPress "Connect Metamask" button ID here
window.buttonID = "#connect"
</script>
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script type="module" src="https://buildship-dev.github.io/NFT-marketplace-webflow/index.js"></script>
```

2. Create a "Connect wallet" button and give it the same ID as in code block above. For example, ID = "connect".

3. In your items collection, you need to set specific classnames to elements so that script finds them.


```
button = .buy-button
token id text block = .nft-id
remaining = .remaining-amount
total items = .total-amount
```

Corresponding HTML will look approx like this:
```html
<div>
  <button class="buy-button">Purchase</button>

  <span class="remaining-amount">
    123</span>
  of
  <span class="total-amount">
    1000</span>
  
  <!-- This is invisible block containing the token ID: -->
  <span class="nft-id">
    0</span>
</div>

```

