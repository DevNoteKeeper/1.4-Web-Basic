class recommend_competition extends HTMLElement{
    connectedCallback(){
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/recommend_competition.css';
        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('recommend');

            box.innerHTML = 
            `
            <div class="title">
                    <div style="margin-right: 15px;">&#128293;</div>
                    <div>Recommend<br/>Competition</div>
                </div>
                <div class="card-wrap">
                    <div class="competition-card">
                        <img src="/images/2023-hackathon.jpg">
                        <div class="competition-context">
                            <div class="card-title">Competition Title</div>
                            <p>Host</p>
                            <p>Deadline</p>
                        </div>
                    </div>
                    <div class="competition-card">
                        <img src="/images/2023-hackathon.jpg">
                        <div class="competition-context">
                            <div class="card-title">Competition Title</div>
                            <p>Host</p>
                            <p>Deadline</p>
                        </div>
                    </div>
                    <div class="competition-card">
                        <img src="/images/2023-hackathon.jpg">
                        <div class="competition-context">
                            <div class="card-title">Competition Title</div>
                            <p>Host</p>
                            <p>Deadline</p>
                        </div>
                    </div>
                </div>
            `;

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);

    
    }
}
customElements.define('recommend-component', recommend_competition);