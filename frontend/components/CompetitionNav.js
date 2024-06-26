class CompetitionNav extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/components_css/CompetitionNav.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('nav');
            let competitionId = window.location.pathname.split('/')[2];

            box.innerHTML = `
                <div class="competition-intro"><a href="/compete_hub/${competitionId}" onclick="location.href='competition_detail.html'">Introduction</a></div>
                <div class="competition-recruit"><a href="/compete_hub/${competitionId}/posts" onclick="location.href='competition_postBoard.html'">Recruit Team Members</a></div>
            `;

            this.appendChild(box);

            if (window.location.pathname.includes("/posts")) {
                const firstElement = box.querySelector('.competition-intro');
                const secondElement = box.querySelector('.competition-recruit');
                firstElement.classList.add('unclicked');
                secondElement.classList.add('clicked');
            } else {
                const firstElement = box.querySelector('.competition-intro');
                const secondElement = box.querySelector('.competition-recruit');
                firstElement.classList.add('clicked');
                secondElement.classList.add('unclicked');
            }
        };

        document.head.appendChild(linkElement);
    }
}

customElements.define('nav-component', CompetitionNav);
