document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-html");
  const status = document.getElementById("status");

  toggleButton.addEventListener("click", async function () {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: toggleHTML
      },
      (result) => {
        const isHidden = result[0].result;
        status.textContent = isHidden ? "HTML désactivé" : "HTML activé";
        toggleButton.textContent = isHidden ? "Activer HTML" : "Désactiver HTML";
      }
    );
  });

  function toggleHTML() {
    const body = document.body;
    const isHidden = body.style.display === "none";
    body.style.display = isHidden ? "" : "none";
    return !isHidden;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: () => document.body.style.display === "none"
      },
      (result) => {
        const isHidden = result[0].result;
        status.textContent = isHidden ? "HTML désactivé" : "HTML activé";
        toggleButton.textContent = isHidden ? "Activer HTML" : "Désactiver HTML";
      }
    );
  });
});
