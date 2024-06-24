class RecruitmentComponent extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/components_css/RecruitmentComponent.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('post-recuritment');

            box.innerHTML = `
            <form id = "recruitmentForm">
            <div style="display: flex; flex-direction:row; margin-bottom: 15px;">
                <input type="text" id = "title" placeholder="   Title" style="width: 670px; height: 36px; margin-right:20px;"/>
                <input type="password" id = "password" placeholder="   Password" style="width: 200px; height: 36px;"/>
            </div>
            <textarea type="text" id = "context" placeholder="   Write the context..." style="width: 900px; height: 250px;"></textarea>
            <input type="submit" class="save" value="Save" style="cursor:pointer"/>
            </form>   
            `;

            this.appendChild(box);

            const form = box.querySelector('#recruitmentForm');
            form.addEventListener('submit', this.handleSubmit.bind(this));
        };

        document.head.appendChild(linkElement);
    }

    async handleSubmit(e){
        e.preventDefault();

        const title = this.querySelector('#title').value;
        const password = this.querySelector('#password').value;
        const context = this.querySelector('#context').value;

        const pathArray = window.location.pathname.split('/');
        const competitionId = pathArray[2];

        const response = await fetch(`/api/competition/${competitionId}/posts/recruitment`,{  // 수정된 URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                password: password,
                context: context,
            }),
        });

        if(response.ok){
            alert('Recruitment post saved successfully!');
            window.location.href = `/compete_hub/${competitionId}/posts`;
        } else{
            alert('Failed to save recruitment post.');
        }

    }
}

customElements.define('recruitment-component', RecruitmentComponent);
