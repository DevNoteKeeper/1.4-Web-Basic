class CompetitionPost extends HTMLElement {
    connectedCallback() {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = "/components/components_css/CompetitionPost.css";
  
      linkElement.onload = () => {
        let box = document.createElement("div");
        box.classList.add("post-comment");
  
        let competitionId = window.location.pathname.split("/")[2];
        let postId = window.location.pathname.split("/")[4];
  
        $.ajax({
          url: "/api/competition/" + competitionId + "/posts/" + postId,
          type: "GET",
          dataType: "json",
          success: function (post) {
            console.log(post);
            box.innerHTML = `
                      <div class="post">
                          <div class="post-title" id="post-title">
                              <p>${post.title}</p>
                                <form id="post-form">
                                    <input type="password" id="password" placeholder="password"/>
                                    <button type="button" id="modify">modify</button>
                                    <button type="button" id="delete">delete</button>
                                </form>
                          </div>
                          <div class="post-metadata">${post.registerDate}</div>
                          <div class="post-content" id="post-content">
                              ${post.context}
                          </div>
                      </div>
  
                      <form class="comment-form">
                          <input type="text" id="name" placeholder="Name" style="width: 100px"/>
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
                    url: `/api/competition/${competitionId}/posts/${postId}/comments`,
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
// Add event listener for post deletion
box.querySelector('#delete').addEventListener('click', function(e) {
    e.preventDefault();
    const password = box.querySelector('#password').value;

    $.ajax({
        url: `/api/competition/${competitionId}/posts/${postId}`,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({password: password}),
        success: function(response) {
            alert('Post deleted successfully');
            window.location.href = response.redirectUrl;
        },
        error: function(xhr, status, error) {
            console.error("Error: ", error);
            alert('Incorrect password');
            window.location.href = `/compete_hub/${competitionId}/posts/${postId}`
        }
    });
});

                    // Add event listener for post modification
                    box.querySelector('#modify').addEventListener('click', function(e) {
                        e.preventDefault();
                        const password = box.querySelector('#password').value;

                        $.ajax({
                            url: `/api/competition/${competitionId}/posts/${postId}/verify`,
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({ password: password }),
                            success: function(response) {
                                const postTitleElement = box.querySelector('#post-title p');
                                const postContentElement = box.querySelector('#post-content');
                                const modifyButton = box.querySelector('#modify');

                                postTitleElement.innerHTML = `<input type="text" class="edit-title" id="edit-title" value="${post.title}"/>`;
                                postContentElement.innerHTML = `<textarea class="edit-content" id="edit-content">${post.context}</textarea>`;
                                modifyButton.textContent = 'save';
                                modifyButton.id = 'save';

                                // Add event listener for save button
                                box.querySelector('#save').addEventListener('click', function(e) {
                                    e.preventDefault();
                                    const newTitle = box.querySelector('#edit-title').value;
                                    const newContent = box.querySelector('#edit-content').value;

                                    if (newTitle.trim() === '' || newContent.trim() === '') {
                                        alert('Title and content cannot be empty');
                                        return;
                                    }

                                    $.ajax({
                                        url: `/api/competition/${competitionId}/posts/${postId}`,
                                        type: "PUT",
                                        contentType: "application/json",
                                        data: JSON.stringify({ title: newTitle, context: newContent, password: password }),
                                        success: function(response) {
                                            alert('Post updated successfully');
                                            location.reload(true);
                                        },
                                        error: function(xhr, status, error) {
                                            console.error("Error: ", error);
                                            alert('Failed to update post');
                                        }
                                    });
                                });
                            },
                            error: function(xhr, status, error) {
                                console.error("Error: ", error);
                                alert('Incorrect password');
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