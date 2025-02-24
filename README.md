### Function Name:

`setupRotateOnHover`

Description:

- This function sets up a hover effect where a child element rotates 180 degrees when the user hovers over its parent element. The parent element is identified by the data-rotate-wrapper attribute, and the child element is identified by the data-rotate-180 attribute. The rotation is animated with a smooth transition lasting 500 milliseconds.

### Key Features:

- Targets parent elements with the data-rotate-wrapper attribute.

- Rotates child elements with the data-rotate-180 attribute.

- Applies a smooth 500ms transition for the rotation effect.

- Works dynamically for multiple parent-child pairs on the page.

```
const initializeRotateOnHover = () => {
  // Select all parent elements with the data-rotate-wrapper attribute
  const wrappers = document.querySelectorAll("[data-rotate-wrapper]");

  // Loop through each parent element
  wrappers.forEach((wrapper) => {
    // Find the child element with the data-rotate-180 attribute
    const child = wrapper.querySelector("[data-rotate-180]");

    // If the child exists, add event listeners to the parent
    if (child) {
      // Add event listener for mouseenter (hover on parent)
      wrapper.addEventListener("mouseenter", () => {
        child.style.transition = "transform 500ms ease";
        child.style.transform = "rotate(180deg)";
      });

      // Add event listener for mouseleave (hover off parent)
      wrapper.addEventListener("mouseleave", () => {
        child.style.transition = "transform 500ms ease";
        child.style.transform = "rotate(0deg)";
      });
    }
  });
};

// Execute the function as soon as the page is loaded
window.addEventListener("DOMContentLoaded", initializeRotateOnHover);

```
