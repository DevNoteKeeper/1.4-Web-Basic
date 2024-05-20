class CompetitionPost extends HTMLElement {
    connectedCallback() {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/components/CompetitionPost.css';

        linkElement.onload = () => {
            let box = document.createElement('div');
            box.classList.add('post-comment');

            box.innerHTML = `
            <div class="post">
            <div class="post-title">
                <p>😄 Who is the last member?!</p>
                <form>
                    <input type="password" id="password" placeholder="password"/>
                    <input type="submit" id="modity" value="modity" />
                    <input type="submit" id="delete" value="delete" />
                </form>
            </div>
            <div class="post-metadata">06.05.2024</div>
            <div class="post-content">
                We are FE 2 and BE 3, and we are waiting last designer member!
                We’ll meet only online and use Whats App
                We are FE 2 and BE 3, and we are waiting last designer member!
                We’ll meet only online and use Whats App
            </div>
            
        </div>
        
        <form class="comment-form">
                <input type="text" placeholder="Add comments" />
                <button class="icon-button">
                    <i class="fa fa-send-o" style="color: #A5ABBD;"></i>
                </button>
        </form>
        <div class="comments">
            <div class="comment">
                <div class="comment-metadata">
                    <p style="margin: 0;font-weight: 600;">😄 Random name</p>
                    <div style="font-size: 18px; margin-left: 15px;">06.05.2024</div>
                </div>
                <div style="padding-left: 10px;">
                    I want to do with you guys!! Plz send msg!!
                </div>
            </div>
            <div class="comment">
                <div class="comment-metadata">
                    <p style="margin: 0;font-weight: 600;">😄 Random name</p>
                    <div style="font-size: 18px; margin-left: 15px;">06.05.2024</div>
                </div>
                <div style="padding-left: 10px;">
                    I want to do with you guys!! Plz send msg!!
                </div>
            </div>
        </div> 
       
            `;

            this.appendChild(box);
        };

        document.head.appendChild(linkElement);
    }
}

customElements.define('post-component', CompetitionPost);
