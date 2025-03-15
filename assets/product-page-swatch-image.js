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
      if (this.currentVariant) {
        this.updateUrlAndVariantId();
        this.updateVariantTitle();
        this.updateUi();
      }
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
  getVariantJson() {
    this.variandData =
      this.variandData ||
      JSON.parse(
        this.variantSelector.querySelector(`[type="application/json"]`)
          .textContent
      );
    return this.variandData;
  }
  //stet-3 get selected variant
  getSelectedVarint() {
    this.currentVariant = this.getVariantJson().find((variant) => {
      //  console.log(variant);
      const findings = variant.options.every((option, index) => {
        return this.options[index] === option;
      });
      if (findings) return findings;
    });
  }
  // step-4 updateUrl
  updateUrlAndVariantId() {
    if (!this.currentVariant) return;
    const variantIdInput = this.querySelector(`[name="id"]`);
    variantIdInput.value = this.currentVariant.id;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  // update Variant title
  updateVariantTitle() {
    const variantTitle = this.querySelector(`#variant_title_${this.sectionId}`);
    variantTitle.innerHTML = this.currentVariant.title;
  }

  // step-5 updatUi
  updateUi() {
    if (!this.currentVariant) return;
    const variantId = this.currentVariant.id;
    const productUrl = this.dataset.url;
    const sectionId = this.sectionId;
    const spinner = this.querySelector(`#spinner_${this.sectionId}`);

    //
    spinner.classList.remove("hidden");
    spinner.classList.add("flex");
    // fetch
    fetch(`${productUrl}?variant=${variantId}&section_id${this.sectionId}`)
      .then((response) => response.text())
      .then((responseText) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(responseText, "text/html");
        // update price
        const oldPrice = this.querySelector(`#price_${this.sectionId}`);
        const newPrice = html.querySelector(`#price_${this.sectionId}`);
        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;

        // update cart action
        const oldCartAction = this.querySelector(
          `#cart_action_${this.sectionId}`
        );
        const newCartAction = html.querySelector(
          `#cart_action_${this.sectionId}`
        );

        if (oldCartAction && newCartAction)
          oldCartAction.innerHTML = newCartAction.innerHTML;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        spinner.classList.add("hidden");
        spinner.classList.remove("flex");
      });
  }

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
