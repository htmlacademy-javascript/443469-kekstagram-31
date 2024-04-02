const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigImageEl = document.querySelector('.big-picture');
const commentShownCountEl = document.querySelector('.social__comment-shown-count');
const commentTotalCountEl = document.querySelector('.social__comment-total-count');
const commentLoaderEl = document.querySelector('.comments-loader');
const commentsEl = bigImageEl.querySelector('.social__comments');
const commentEl = bigImageEl.querySelector('.social__comment');

const renderNextComments = () => {
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach(({avatar, name, message}) => {
    const newComment = commentEl.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsEl.append(newComment);
  });

  commentShownCountEl.textContent = `${renderedCommentsLength}`;
  commentTotalCountEl.textContent = `${comments.length}`;

  if (comments.length <= renderedCommentsLength) {
    commentLoaderEl.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  commentsEl.innerHTML = '';
  currentCount = 0;
};

const renderComments = (commentsTotal) => {
  comments = commentsTotal;
  renderNextComments();

  commentLoaderEl.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments};
