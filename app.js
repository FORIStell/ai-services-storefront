const repo = "FORIStell/ai-services-storefront";
const form = document.querySelector("#order-form");
const service = document.querySelector("#service");
const brief = document.querySelector("#brief");
const budget = document.querySelector("#budget");
const deadline = document.querySelector("#deadline");
const acceptance = document.querySelector("#acceptance");
const status = document.querySelector("#form-status");

document.querySelectorAll(".choose-service").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".service-card");
    service.value = card.dataset.service;
    budget.value = `${card.dataset.price} USDC`;
    document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
    brief.focus({ preventScroll: true });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = `[Quote request] ${service.value}`;
  const body = [
    "## Service",
    service.value,
    "",
    "## Requested deliverable",
    brief.value.trim(),
    "",
    "## Budget",
    budget.value.trim() || "Please quote",
    "",
    "## Deadline",
    deadline.value.trim() || "Flexible",
    "",
    "## Acceptance check",
    acceptance.value.trim() || "Please propose an objective acceptance check",
    "",
    "## Safety confirmation",
    "I have not included secrets, personal records, private keys, passwords, or confidential data. I understand payment is requested only after a written quote is accepted."
  ].join("\n");
  const url = new URL(`https://github.com/${repo}/issues/new`);
  url.searchParams.set("title", title);
  url.searchParams.set("body", body);
  url.searchParams.set("labels", "order");
  status.textContent = "Opening the public order desk in a new tab.";
  window.open(url.toString(), "_blank", "noopener,noreferrer");
});

document.querySelector("#copy-wallet").addEventListener("click", async (event) => {
  const value = document.querySelector("#wallet").textContent.trim();
  try {
    await navigator.clipboard.writeText(value);
    event.currentTarget.textContent = "Address copied";
  } catch {
    event.currentTarget.textContent = "Select the address above to copy";
  }
});
