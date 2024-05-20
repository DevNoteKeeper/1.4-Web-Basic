class RecruitmentComponent extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/RecruitmentComponent.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('post-recuritment');

            box.innerHTML = `
            <form>
            <div style="display: flex; flex-direction:row; margin-bottom: 15px;">
                <input type="text" placeholder="   Title" style="width: 670px; height: 36px; margin-right:20px;"/>
                <input type="password" placeholder="   Password" style="width: 200px; height: 36px;"/>
            </div>
            <textarea type="text" placeholder="   Write the context..." style="width: 900px; height: 250px;"></textarea>
            <input type="submit" class="save" value="Save" />
            </form>   
            `;

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);
    }
}

customElements.define('recruitment-component', RecruitmentComponent);
