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
  }

  onVariantChange() {
    this.variantSelector.addEventListener("change", () => {
      this.getSelectedOptions();
      this.getSelectedVariant();
      console.log(this.currentVariant);
      // console.log(this.variantData);
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

  //   ------------------------------------
}

customElements.define("featured-prodcut-one", FeaturedrProductSectionOne);
