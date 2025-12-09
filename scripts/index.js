let todayQuote = "";

function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

async function loadQuote() {
    const res = await fetch("quotes.json");
    const quotes = await res.json();

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000);

    const index = (dayOfYear * 31337) % quotes.length;
    todayQuote = quotes[index];
}

document.addEventListener("DOMContentLoaded", async () => {
    const quoteBox = document.getElementById("quote");
    const btn = document.getElementById("btn");

    const today = getTodayKey();
    const lastShown = localStorage.getItem("lastShownDate");

    await loadQuote();

    if (lastShown === today) {
        quoteBox.textContent = todayQuote;
        quoteBox.classList.remove("hidden");
        quoteBox.classList.add("show");
        btn.disabled = true;
        btn.textContent = "Come back tomorrow";
    }

    btn.addEventListener("click", () => {
        quoteBox.textContent = todayQuote;
        quoteBox.classList.remove("hidden");
        quoteBox.classList.add("show");

        btn.disabled = true;
        btn.textContent = "Come back tomorrow";

        localStorage.setItem("lastShownDate", today);
    });
});
