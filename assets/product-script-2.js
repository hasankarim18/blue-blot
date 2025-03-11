class ProductInfo extends HTMLElement {
  constructor() {
    super();
    this.initProductInfo();
  }

  initProductInfo() {
    // console.log("product info");
  }
} // product info
// define custom element
customElements.define("product-info", ProductInfo);

// #variant-selector

class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.initVariantSelector();
  }

  initVariantSelector() {
    //  console.log("init variant selector");
    this.getProductUrl();
    // console.log(this.productUrl);
  }

  getProductUrl() {
    //  this.productUrl = this.getAttribute('data-url')
    this.productUrl = this.getAttribute("data-url");
  }
} // vaiant selector

customElements.define("vaiant-selector", VariantSelector);
