class RecommendCompetition extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/RecommendCompetition.css';
        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('recommend');

            $.ajax({
                url: '/api/competition/top',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    data.forEach(competition => {
                        let dday = Math.ceil((new Date(competition.endDate) - Date.now()) / (1000 * 60 * 60 * 24));
                        const imageUrl = `/${competition.poster.replace(/\\/g, "/")}`;
                        const competitionCard = document.createElement('div');
                        competitionCard.classList.add('competition-card');
                        competitionCard.innerHTML = `
                            <div class="competition-card" style="cursor:pointer;">
                                <img src="${imageUrl}">
                                <div class="competition-context">
                                    <div class="card-title">${competition.title}</div>
                                    <p>${competition.company}</p>
                                    <p style="color:#CC7183;">${dday < 0 ? 'CLOSED' : 'D-' + dday}</p>
                                </div>
                            </div>
                        `;
                        competitionCard.addEventListener('click', function() {
                            window.location.href = `/compete_hub/${competition.competition_id}`;
                        });
                        $('#recommendCardWrap').append(competitionCard);
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Error: ', error);
                }
            });

            box.innerHTML =
                `
                <div class="title">
                    <div style="margin-right: 15px;">&#128293;</div>
                    <div>Recommend<br/>Competition</div>
                </div>
                <div class="card-wrap" id="recommendCardWrap">
                    
                </div>
            `;

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);
    }
}

customElements.define('recommend-component', RecommendCompetition);
