/*
  AUFGABE (Übungsfile):
  Ziel: Die Kreise sollen animiert werden, sobald ein Step in den Viewport eintritt.

  Was ist schon vorbereitet?
  - Die CSS-Animation ist bereits vorhanden.
  - Die Kreise und Steps sind im HTML vorhanden.
  - Scrollama ist eingebunden.

  Deine Aufgabe:
  1) Reagiere auf das Enter-Event von Scrollama (ein Step tritt in den Viewport).
  2) Entferne die Klasse "is-active" bei allen Steps.
  3) Füge die Klasse "is-active" dem aktuell aktiven Step hinzu.

  Tipp:
  - Im Callback liefert dir Scrollama ein "response"-Objekt.
  - Das aktuelle Element findest du über: response.element
  - Überlege, welche Klasse in style.css den Circle vergrößert.
*/

const stepEls = document.querySelectorAll(".step");
const scroller = scrollama();

function handleStepEnter(response) {
  // TODO: Hier den Trigger zwischen Scrollama-Event und CSS-Klasse herstellen.
  // console.log(response);
   stepEls.forEach((step) => {
    step.classList.remove("is-active");
  });

  response.element.classList.add("is-active");
}

scroller.setup({
  step: ".step",
  offset: 0.6
});

scroller.onStepEnter(handleStepEnter);

window.addEventListener("resize", () => {
  scroller.resize();
});

