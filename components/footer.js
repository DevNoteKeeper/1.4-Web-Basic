class footer extends HTMLElement{
    connectedCallback(){
        const style = `
        .footer{
            font-family: "Fredoka", sans-serif;
            font-size: 20px;
            font-weight: 400;
            color: #A5ABBD;

            width: 100%;
            height: 245px;
            

            background-color: #414656;
    
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            
        }
        .logo-light{
            font-size: 32px;
            font-weight: 700;
            color: #E0E0E0;
            margin: 15px;

            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .menu-bottom{
            padding: 15px;
        }
        a{
            text-decoration-line: none;
            margin: 15px;
            color: #A5ABBD;
        }
        hr {
            width: 1440px;
            border-color: #A5ABBD; /* 선의 색상 지정 */
            margin: 15px;
            border-style: solid;
        }
        .copyright{
            margin-bottom: 30px;
        }
        

    `;
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    let box = document.createElement('div');
    box.classList.add('footer');

    box.innerHTML = 
    `
    <div>
        <div class="logo-light"> < DevHub /> </div>
        <div class = "menu-bottom">
            <a href="/">Home</a>
            <a href="/compete_hub">Compete_Hub</a>
            <a href="/algorithm_hub">Algorithms_Hub</a>
        </div>
    </div>
    <hr/>
    <div class="copyright"> @Copyright < DevHub /> </div>

    `;

    this.appendChild(styleElement);
    this.appendChild(box);
    }
}
customElements.define('footer-component', footer);