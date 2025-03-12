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
    this.addEventListener("change", (e) => {
      this.onVariantChange();
    });
  } // constructor

  onVariantChange() {
    this.getSelectedOptions();
    this.getSelectedVariant();
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );

    console.log(this.options);
  }

  getVariantJson() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJson().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);
      if (findings) return variant;
    });
    console.log(this.currentVariant);
  }
} // vaiant selector

customElements.define("vaiant-selector", VariantSelector);
