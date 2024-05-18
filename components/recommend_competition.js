class recommend_competition extends HTMLElement{
    connectedCallback(){
        const style = `
        .recommend{
            font-family: "Fredoka", sans-serif;
            color: #414656;
    
            width: 100%;
            height: 360px;
            background-color: rgba(165, 171, 189, 0.1);
    
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        .title{
            font-size: 32px;
            font-weight: 700;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 100px;
        }
        .card-wrap{
            display: flex;
            flex-direction: row;
        }
        .competition-card{
            margin-right: 50px;
        }
        .competition-card:last-child{
            margin-right: 0px;
        }
        .competition-card > img{
            width: 250px;
            height: 200px;
            border-radius: 15px;
            object-fit: cover;
        }
        .competition-context{
            height: 100px;
            font-weight: 400;
            padding: 10px 15px;
        }
        .card-title{
            font-size: 20px;
            
        }
        .competition-context > {
            font-size: 16px;
        }
    `;
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

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

    this.appendChild(styleElement);
    this.appendChild(box);
    }
}
customElements.define('recommend-component', recommend_competition);