class ProductPageSwatchImage extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.dataset.section;
    this.variantSelector = this.querySelector(
      `#variant_selector_${this.sectionId}`
    );
    this.onVariantChange();
    this.showColorSwatchName();

    this.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.handleSwatchSelection(e);
      });
    });
  }

  // initially select variant

  // #handle swatch selection
  handleSwatchSelection(e) {
    const label = e.target.closest(".swatch_label");

    if (!label) return;
    const optionName = label.dataset.option;

    this.variantSelector
      .querySelectorAll(`[data-option=${optionName}]`)
      .forEach((label) => {
        label.classList.remove("selected_swatch");
      });
    label.classList.add("selected_swatch");
    //  console.log(label.classList);
  }

  onVariantChange() {
    // console.log("on variant change");
    this.variantSelector.addEventListener("change", () => {
      this.getSelectedOptions();
      this.getSelectedVarint();
      console.log(this.options);
    });
  }

  //stet-1 get selected option
  getSelectedOptions() {
    const inputs = this.variantSelector.querySelectorAll(
      'input[type="radio"]:checked'
    );
    this.options = Array.from(inputs, (radio) => radio.value);
  }
  //stet-2 get variant json
  getVariantJson() {}
  //stet-3 get selected variant
  getSelectedVarint() {}
  // step-4 updateUrl
  updateUrl() {}
  // step-5 updatUi
  updateUi() {}

  //show swatch image or color
  showColorSwatchName() {
    console.log();
    const labels = this.querySelectorAll(
      `[data-label="label_${this.sectionId}"]`
    );
    labels.forEach((label) => {
      // mouse enter
      label.addEventListener("mouseenter", (e) => {
        const option = e.target.dataset.option;
        const value = e.target.dataset.value;
        if (option == "color") {
          const outputSpan = this.querySelector(
            `#show_value_${option}_${this.sectionId}`
          );
          outputSpan.innerHTML = value;
          //  console.log(outputSpan);
        }
        //  e.target.style.outline = "2px red solid";
      });

      // mouse leave
      label.addEventListener("mouseleave", (e) => {
        const option = e.target.dataset.option;
        const value = e.target.dataset.value;
        if (option == "color") {
          const outputSpan = this.querySelector(
            `#show_value_${option}_${this.sectionId}`
          );
          outputSpan.innerHTML = "";
          //  console.log(outputSpan);
        }
        // e.target.style.outline = "none";
      });
    });
  }

  // -------------
}

customElements.define("product-swatch-image", ProductPageSwatchImage);
