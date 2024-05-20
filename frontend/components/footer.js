class Footer extends HTMLElement{
    connectedCallback(){
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/Footer.css';

        linkElement.onload = () => {
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

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);
    
    }
}
customElements.define('footer-component', Footer);