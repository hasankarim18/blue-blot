class FeaturedrProductSectionOne extends HTMLElement {
  constructor() {
    super();
    this.productUrl = this.dataset.url;
    this.sectionId = this.dataset.section;
    this.variantIdInput = this.querySelector(`[name="id"]`);
    this.variantSelector = this.querySelector(
      `#variant_selector_${this.sectionId}`
    );
    this.onVariantChange();

    this.variantSelector
      .querySelectorAll(`input[type="radio"]`)
      .forEach((radio) => {
        radio.addEventListener("change", (e) => {
          this.handleSwatchSelection(e);
        });
      });
  }

  handleSwatchSelection(e) {
    const selectedLabel = e.target.closest(`#swatch_label_${this.sectionId}`);
    if (!selectedLabel) return;
    const optionName = selectedLabel.dataset.option;
    console.log(optionName);
    this.variantSelector
      .querySelectorAll(`[data-option=${optionName}]`)
      .forEach((label) => {
        // console.log(label);
        label.classList.remove("selected_swatch");
      });

    selectedLabel.classList.add("selected_swatch");
  }

  onVariantChange() {
    this.variantSelector.addEventListener("change", () => {
      this.getSelectedOptions();
      this.getSelectedVariant();
      //  console.log(this.currentVariant);
      // console.log(this.variantData);
      this.updateVariantId();
      this.updateUi();
    });
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.variantSelector.querySelectorAll('input[type="radio"]:checked'),
      (radio) => radio.value
    );
  }

  getVarintsJson() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);

    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVarintsJson().find((variant) => {
      const findings = variant.options.every(
        (option, index) => this.options[index] === option
      );
      if (findings) return findings;
    });
  }

  // update Variant Id
  updateVariantId() {
    if (!this.currentVariant) return;
    const variantId = this.querySelector(`input[name="id"]`);
    variantId.value = this.currentVariant.id;
  }

  // update ui
  updateUi() {
    if (!this.currentVariant) return;
    const variantId = this.currentVariant.id;
    try {
      fetch(
        `${this.productUrl}?variant=${variantId}&section_id=${this.sectionId}`
      )
        .then((response) => response.text())
        .then((responseText) => {
          const parser = new DOMParser();
          const html = parser.parseFromString(responseText, "text/html");
          // update price
          const oldPrice = this.querySelector(`#price_${this.sectionId}`);
          const newPrice = html.querySelector(`#price_${this.sectionId}`);
          console.log(oldPrice);
          if (oldPrice && newPrice) {
            oldPrice.innerHTML = newPrice.innerHTML;
          }

          // update cart action
        });
    } catch (error) {
      console.log(error);
    }
  }

  //   ------------------------------------
}

customElements.define("featured-prodcut-one", FeaturedrProductSectionOne);
