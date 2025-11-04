document.addEventListener("DOMContentLoaded", async () => {
  try {
    const navHTML = await fetch("./nav.html").then(res => res.text());
    const footerHTML = await fetch("./footer.html").then(res => res.text());
    document.getElementById("nav").innerHTML = navHTML;
    document.getElementById("footer").innerHTML = footerHTML;
  } catch (err) {
    console.error("로드 실패:", err);
  }
});
