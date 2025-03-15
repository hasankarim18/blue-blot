console.log("template-load");

class ProductPageSwatchImage extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.dataset.section;
    this.onVariantChange();
    this.showColorSwatchName();
  }

  onVariantChange() {
    console.log("on variant change");
  }

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
        e.target.style.outline = "2px red solid";
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
        e.target.style.outline = "none";
      });
    });
  }

  // -------------
}

customElements.define("product-swatch-image", ProductPageSwatchImage);
