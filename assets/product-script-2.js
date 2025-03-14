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
    const cart_action_id = `cart_action_${this.dataset.section}`;
    const oldPrice = document.getElementById(price_id);
    const oldCartAction = document.getElementById(cart_action_id);

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
        // update price
        const newPrice = html.getElementById(price_id);
        if (oldPrice && newPrice) {
          oldPrice.innerHTML = newPrice.innerHTML;
        }
        // update cart action
        const newCartAction = html.getElementById(cart_action_id);
        if (oldCartAction && newCartAction)
          oldCartAction.innerHTML = newCartAction.innerHTML;
        // ------------
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

// #varaint selector swatch

class ProductInfoSwatch extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.dataset.section;
    this.variantSelectorSwatch = this.querySelector(`vaiant-selector-swatch`);
    this.onVariantChange();

    this.variantSelectorSwatch
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => {
        radio.addEventListener("change", (e) => {
          this.handleSwatchSelection(e);
        });
      });
  }

  handleSwatchSelection(e) {
    const selectedLabel = e.target.closest(".swatch-level");
    if (!selectedLabel) return;
    // remove selected class from all options of the same group
    const optionName = selectedLabel.dataset.option;
    this.variantSelectorSwatch
      .querySelectorAll(`[data-option=${optionName}]`)
      .forEach((label) => {
        label.classList.remove("selected_swatch");
      });

    selectedLabel.classList.add("selected_swatch");
    // console.log(e);
  }

  onVariantChange() {
    this.variantSelectorSwatch.addEventListener("change", () => {
      this.getSelectedOptions();
      this.getSelectedVariant();
      if (this.currentVariant) {
        this.updateUrl();
        this.updateUi();
      }
    });
  }
  getSelectedOptions() {
    this.options = Array.from(
      this.variantSelectorSwatch.querySelectorAll(
        'input[type="radio"]:checked'
      ),
      (radio) => radio.value
    );
  }

  getVariantJson() {
    this.variantData =
      this.variantData ||
      JSON.parse(
        this.variantSelectorSwatch.querySelector('[type="application/json"]')
          .textContent
      );

    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJson().find((variant) => {
      const findings = variant.options.every(
        (option, index) => this.options[index] === option
      );
      if (findings) {
        return findings;
      }
    }); // find
  }

  updateUrl() {
    if (!this.currentVariant) return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  // ------
  updateUi() {
    //fetch('')
    if (!this.currentVariant) return;
    const varinat_id = this.currentVariant.id;
    const product_url = this.variantSelectorSwatch.dataset.url;
    const section_id = this.variantSelectorSwatch.dataset.section;

    const spinner = this.querySelector(`#spinner_${section_id}`);

    /* fetch latest product */
    if (spinner) {
      spinner.classList.remove("hidden");
    }

    try {
      // load spinner

      // fetch product with section
      fetch(`${product_url}?variant=${varinat_id}&section_id=${section_id}`)
        .then((response) => response.text())
        .then((responseText) => {
          const parser = new DOMParser();
          const html = parser.parseFromString(responseText, "text/html");
          // update_price
          const oldPrice = this.querySelector(`#price_${section_id}`);
          const newPrice = html.querySelector(`#price_${section_id}`);

          if (oldPrice && newPrice) {
            oldPrice.innerHTML = newPrice.innerHTML;
          }
          // update cart_action
          const oldCartAction = this.querySelector(
            `#cart_action_${section_id}`
          );
          const newCartAction = html.querySelector(
            `#cart_action_${section_id}`
          );
          if (oldCartAction && newCartAction) {
            oldCartAction.innerHTML = newCartAction.innerHTML;
          }

          // selected_variant update

          const oldSelectedVariant = this.querySelector(
            `#selected_variant_${section_id}`
          );
          const newSelectedVariant = html.querySelector(
            `#selected_variant_${section_id}`
          );

          if (oldSelectedVariant && newSelectedVariant) {
            oldSelectedVariant.innerHTML = newSelectedVariant.innerHTML;
          }

          // update feature image
          const oldFeatureMedia = this.querySelector(
            `#feature_media_${this.sectionId}`
          );
          const newFeatureMedia = html.querySelector(
            `#feature_media_${this.sectionId}`
          );
          //  console.log(newFeatureMedia);

          if (oldFeatureMedia && newFeatureMedia) {
            oldFeatureMedia.innerHTML = newFeatureMedia.innerHTML;
          }

          //-------------
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          spinner.classList.add("hidden");
        });
    } catch (error) {
      console.log(error);
    }
  }
} // end class

customElements.define("product-info-swatch", ProductInfoSwatch);
// #variant selector swatch
class VariantSelectorSwatch extends HTMLElement {
  constructor() {
    super();
    this.onVariantChange();
  }

  onVariantChange() {
    console.log("on variant change");
  }
  //get optins
}

customElements.define("vaiant-selector-swatch", VariantSelectorSwatch);
