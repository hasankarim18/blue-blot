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
    this.form = document.querySelector("#priduct_form");
    this.addEventListener("change", (e) => {
      this.onVariantChange();
    });
  } // constructor

  onVariantChange() {
    this.getSelectedOptions();
    this.getSelectedVariant();
    if (this.currentVariant) {
      this.updateUrl();
      this.updatePrice();
      this.updateVarintId();
    }
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

  // #update url
  updateUrl() {
    if (!this.currentVariant) return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }
  // #update variant id
  updateVarintId() {
    if (!this.currentVariant) return;
    const form_input = document
      .querySelector("#priduct_form")
      .querySelector('input[name="id"]');
    form_input.value = this.currentVariant.id;
  }

  // #update price

  updatePrice() {
    if (!this.currentVariant) return;
  }

  // #update ui
  updateUi() {
    if (!this.currentVariant) return;

    // update price
  }
} // vaiant selector

customElements.define("vaiant-selector", VariantSelector);
