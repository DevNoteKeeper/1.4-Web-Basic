class CompetitionInfo extends HTMLElement{
    connectedCallback(){
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/CompetitionInfo.css';
        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('info-wrap');

            box.innerHTML = 
            `<div class="info">
            <img src="/images/challenge.png" />
            <div class="text-box">
            <p>Competition Title</p>
            <div class="tags">#IT, #Hackaton, #Environment</div>
            <div style="margin-bottom: 15px;">HostCompany</div>
            <div>2024.05.06 ~ 2024.05.30</div>
            <button type="button" class="apply-button">Apply</button>
            </div>
            </div>
            <nav-component></nav-component>

            `;

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);

    
    }
}
customElements.define('info-component', CompetitionInfo);