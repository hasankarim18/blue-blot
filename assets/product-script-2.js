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
    this.spinner = document.getElementById(`spinner_${this.dataset.section}`);
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
      this.updateUi();
    }
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );

    //  console.log(this.options);
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

    //  console.log(this.currentVariant);
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

    const price_id = `price_${this.dataset.section}`;
    const oldPrice = document.getElementById(price_id);

    // Show spinner
    if (this.spinner) {
      this.spinner.classList.remove("hidden");
    }

    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        return response.text();
      })
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");

        const newPrice = html.getElementById(price_id);
        if (oldPrice && newPrice) {
          oldPrice.innerHTML = newPrice.innerHTML;
        }
      })
      .catch((error) => {
        console.error("Error fetching price:", error);
        if (oldPrice) {
          oldPrice.innerHTML =
            '<span class="error-text">Failed to load price</span>';
        }
      })
      .finally(() => {
        // Hide spinner
        if (this.spinner) {
          this.spinner.classList.add("hidden");
        }
      });
  } // update ui
}
// vaiant selector

customElements.define("vaiant-selector", VariantSelector);
