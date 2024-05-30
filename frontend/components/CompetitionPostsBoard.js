class CompetitionPostsBoard extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/CompetitionPostsBoard.css';

        linkElement.onload = async () => {
            let box = document.createElement('div');
            box.classList.add('board');

            const competitionId = window.location.pathname.split('/')[2];
            const response = await fetch(`/api/competition/${competitionId}/posts`);
            
            if(response.ok){
                const posts = await response.json();

                box.innerHTML = `<button type="button" class="post-button" id="postButton">Post Recruitment</button>`;

                posts.forEach(post =>{
                    let postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.dataset.postId = post.post_id;

                    postElement.innerHTML = postElement.innerHTML = `
                    <p class="post-title" style="cursor:pointer">${post.title}</p>
                    <div class="post-metadata">
                        <div style="margin-right: 30px;">${post.registerDate}</div>
                        <div class="post-comment">
                            <i class="fa fa-comments-o" style="margin-right: 10px;"></i>
                            <div>03</div>
                        </div>
                    </div>
                `;
                box.appendChild(postElement);
            });
        }
            

            this.appendChild(box);

            const postButton = this.querySelector('#postButton');
            postButton.addEventListener('click', this.handlePostButtonClick.bind(this));

            const postTitles = this.querySelectorAll('.post-title');
            postTitles.forEach(title => {
                title.addEventListener('click', this.handlePostMove.bind(this));
            });
            
        };

        document.head.appendChild(linkElement);
    }
    handlePostButtonClick() {
        let competitionId = window.location.pathname.split('/')[2];
        window.location.href = `/compete_hub/${competitionId}/posts/recruitment`;
    }
    handlePostMove(e) {
        let postId = e.target.parentElement.dataset.postId;
        let competitionId = window.location.pathname.split('/')[2];
        window.location.href = `/compete_hub/${competitionId}/posts/${postId}`;
    }

}

customElements.define('board-component', CompetitionPostsBoard);
