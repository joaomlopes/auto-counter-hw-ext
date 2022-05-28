document.addEventListener("DOMContentLoaded", async () => {
  // Display counter.
  await displayCounter();

  // Reset counter.
  document.getElementById("reset").addEventListener("click", async () => {
    await HomeworkService.resetCounter();
    await HomeworkService.clearIDs();
    await new Homework().updateBadge(0);
    await displayCounter();
  });

  // Increment counter.
  document.getElementById("increment").addEventListener("click", async () => {
    await HomeworkService.incrementCounter();
    await displayCounter();
  });

  // Decrement counter.
  document.getElementById("decrement").addEventListener("click", async () => {
    await HomeworkService.decrementCounter();
    await displayCounter();
  });
});

const displayCounter = async () => {
  const counter = await HomeworkService.getCounter();
  const pageList = document.querySelector("#counter");
  pageList.innerHTML = counter;
};
