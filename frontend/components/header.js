class Header extends HTMLElement {
    connectedCallback() {

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/Header.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('header');

            box.innerHTML = `
                <a href="/" class="logo-dark"> < DevHub /> </a>
                <div class="menu">
                    <a href="/compete_hub">Compete_Hub</a>
                    <a href="/algorithm_hub">Algorithms_Hub</a>
                </div>
                <input class="searching_bar" type="text" placeholder="   Searching..." />
                <button class="registration" onClick="location.href='/registration'">Registration</button>
            `;

            if(window.location.pathname.includes("/compete_hub")){
                const competeHubElement = box.querySelector('.menu > a[href="/compete_hub"]');
                competeHubElement.classList.add('clicked-active');
            } else if(window.location.pathname === "/algorithm_hub"){
                const algorithmHubElement = box.querySelector('.menu > a[href="/algorithm_hub"]');
                algorithmHubElement.classList.add('clicked-active');
            }

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);
    }
}

customElements.define('header-component', Header);
