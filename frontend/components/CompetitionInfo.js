class CompetitionInfo extends HTMLElement {
  connectedCallback() {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/components/components_css/CompetitionInfo.css";
    linkElement.onload = () => {
      let box = document.createElement("div");
      box.classList.add("info-wrap");

      let competitionId = window.location.pathname.split("/")[2];

      $.ajax({
        url: "/api/competition/" + competitionId,
        type: "GET",
        data: "json",
        success: function (competition) {
          console.log(competition);
          const imageUrl = `/${competition.poster.replace(/\\/g, "/")}`;
          box.innerHTML = `<div class="info">
            <img src="${imageUrl}" />
            <div class="text-box">
            <p>${competition.title}</p>
            <div class="tags">${competition.tags}</div>
            <div style="margin-bottom: 15px;">${competition.company}</div>
            <div>${competition.startDate} ~ ${competition.endDate}</div>
            <button type="button" class="apply-button" onclick="location.href='${competition.homepage}'">Apply</button>
            </div>
            </div>
            <nav-component></nav-component>

            `;
        },
        error: function (xhr, status, error) {
          console.error("Error: ", error);
        },
      });

      this.appendChild(box);
    };

    document.head.appendChild(linkElement);
  }
}
customElements.define("info-component", CompetitionInfo);
