class header extends HTMLElement {
    connectedCallback() {
        const style = `
        .header{

            font-family: "Fredoka", sans-serif;
            font-weight: 400;
            font-size: 20px;
            color: #414656;


            height: 40px;
            width: 100%;
        
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 20px;
        
    
            border-bottom: solid rgba(65, 70, 86, 0.3);
        }
        .logo-dark{
            font-size: 32px;
            font-weight: 700;
            color: #414656;
            text-decoration-line: none;

            margin-right: 100px;
        }
    
      .menu > a{
            text-decoration-line: none;
            margin-right: 30px;    
        }
        .menu{
            margin-right: 50px;
        }
        .searching_bar{
            width: 250px;
            height: 40px;
            border-radius: 35px;
            border: solid rgba(65, 70, 86, 0.3);
    
            margin-right: 30px;        
        }
        .searching_bar > placehorder{
            padding: 14px;
        }
        .registration{
            width: 130px;
            height: 50px;
            border-radius: 35px;
            border: solid rgba(65, 70, 86, 0.3);
            background-color: transparent;
            color:#A5ABBD;
        }     
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = style;

        let box = document.createElement('div');
                box.classList.add('header');

        box.innerHTML = 
        `
        
        <a href="/" class = "logo-dark"> < DevHub /> </a>
        <div class ="menu">
            <a href="/compete_hub">Compete_Hub</a>
            <a href="/algorithm_hub">Algorithms_Hub</a>
        </div>
        
        <input class="searching_bar" type="text" placeholder="Searching..."/>
        <button class="registration">Registration</button>
      
        `;

        this.appendChild(styleElement);
                this.appendChild(box);
    }
}
customElements.define('header-component', header);
