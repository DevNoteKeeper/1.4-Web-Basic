class CompetitionPostsBoard extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/CompetitionPostsBoard.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('board');

            box.innerHTML = `
            <button type="button" class="post-button" id="postButton">Post Recruitment</button>
            <div class="post" id="postId">
            <p>😄 Who is the last member?!</p>
            <div class="post-metadata">
                <div style="margin-right: 30px;">06.05.2024</div>
            <div class="post-comment">
                <i class="fa fa-comments-o" style="margin-right: 10px;"></i>
                <div>03</div>
            </div>
            </div>
            
            
        </div>    
            `;

            this.appendChild(box);

            const postButton = this.querySelector('#postButton');
            postButton.addEventListener('click', this.handlePostButtonClick.bind(this));

            const postId = this.querySelector('#postId');
            postId.addEventListener('click', this.handlePostMove.bind(this));
            
        };

        document.head.appendChild(linkElement);
    }
    handlePostButtonClick() {
        let competitionId = window.location.pathname.split('/')[2];
        window.location.href = '/compete_hub/'+competitionId+'/posts/recruitment';
    }
    handlePostMove(){
        let competitionId = window.location.pathname.split('/')[2];
        window.location.href = '/compete_hub/'+competitionId+'/posts/1';
    }

}

customElements.define('board-component', CompetitionPostsBoard);
