/* eslint-disable no-console */
import tooltip from "./popover";

const container = document.querySelector(".container");
const data = {
  "btn-1": {
    title: "Popover first",
    message: "And here's some amazing content. It's very engaging. Right?",
  },
  "btn-2": {
    title: "Popover second",
    message: "Something about second button",
  },
  "btn-3": {
    title: "Popover third",
    message: "Something about else",
  },
  "btn-4": {
    title: "Popover fourth",
    message: "Again something about something",
  },
};
container.addEventListener("click", (event) => {
  event.preventDefault();
  const { target } = event;
  const btn = target.closest(".btn");

  if (btn) {
    let popover = btn.querySelector(".popover");
    if (!popover) {
      popover = tooltip(data[btn.id], btn);
    } else {
      popover.classList.toggle("hidden");
    }
  }
});
