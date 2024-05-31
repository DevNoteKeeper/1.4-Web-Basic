class CompetitionPost extends HTMLElement {
  connectedCallback() {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "/components/CompetitionPost.css";

    linkElement.onload = () => {
      let box = document.createElement("div");
      box.classList.add("post-comment");

      let competitionId = window.location.pathname.split("/")[2];
      let postId = window.location.pathname.split("/")[4];

      $.ajax({
        url: "/api/competition/" + competitionId + "/posts/" + postId,
        type: "GET",
        data: "json",
        success: function (post) {
          console.log(post);
          box.innerHTML = `
                    <div class="post">
                        <div class="post-title">
                            <p>${post.title}</p>
                            <form>
                                <input type="password" id="password" placeholder="password"/>
                                <input type="submit" id="modity" value="modity" />
                                <input type="submit" id="delete" value="delete" />
                            </form>
                        </div>
                        <div class="post-metadata">${post.registerDate}</div>
                        <div class="post-content">
                            ${post.context}
                        </div>
                        
                    </div>

                    <form class="comment-form">
                        <input type="name" id="name" placeholder="Name" style="width: 100px"/>
                        <input type="text" id="comment" placeholder="Add comments" />
                        <button class="icon-button" id="submit">
                            <i class="fa fa-send-o" style="color: #A5ABBD;"></i>
                        </button>
                    </form>
                    `;
                    $.ajax({
                        url: `/api/competition/${competitionId}/posts/${postId}/comments`,
                        type: "GET",
                        dataType: "json",
                        success: function(comments) {
                            const commentsContainer = document.createElement('div');
                            commentsContainer.classList.add('comments');
    
                            comments.forEach(comment => {
                                const commentElement = document.createElement('div');
                                commentElement.classList.add('comment');
                                commentElement.innerHTML = `
                                    <div class="comment-metadata">
                                        <p style="margin: 0;font-weight: 600;">${comment.name}</p>
                                        <div style="font-size: 18px; margin-left: 15px;">${comment.registerDate}</div>
                                    </div>
                                    <div style="padding-left: 10px;">
                                        ${comment.comment}
                                    </div>
                                `;
                                commentsContainer.appendChild(commentElement);
                            });
    
                            box.appendChild(commentsContainer);
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching comments: ", error);
                        }
                    });

                    //Add event listener for comment submission
                    box.querySelector('.comment-form').addEventListener('submit', function(e){
                        e.preventDefault();
                        const name = box.querySelector('#name').value;
                        const comment = box.querySelector('#comment').value;

                        $.ajax({
                            url: "/compete_hub/" + competitionId + "/posts/" + postId + "/comments",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({name: name, comment: comment}),
                            success: function(response){
                                alert('Comment saved successfully');
                                location.reload(true);
                            },
                            error: function(xhr, status, error){
                                console.error("Error: ", error);
                                alert('Failed to save comment');
                            }
                        });
                    });
        },
        error: function (xhr, status, error) {
          console.error("Error: ", error);
        },
      });
      this.appendChild(box);
    };

    document.head.appendChild(linkElement);
  }
}

customElements.define("post-component", CompetitionPost);
