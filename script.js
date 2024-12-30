// Blog data storage
let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

// Selectors
const blogList = document.getElementById('blogList');
const createBlogBtn = document.getElementById('createBlogBtn');
const blogModal = document.getElementById('blogModal');
const blogForm = document.getElementById('blogForm');
const modalTitle = document.getElementById('modalTitle');
const blogIdInput = document.getElementById('blogId');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const cancelBtn = document.getElementById('cancelBtn');

// Event Listeners
createBlogBtn.addEventListener('click', () => openModal());
cancelBtn.addEventListener('click', () => closeModal());
blogForm.addEventListener('submit', saveBlog);

// Functions
function renderBlogs() {
  blogList.innerHTML = blogs
    .map(
      (blog, index) => `
      <div class="blog-card">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <button onclick="editBlog(${index})">Edit</button>
        <button onclick="deleteBlog(${index})">Delete</button>
      </div>
    `
    )
    .join('');
}

function openModal(blog = null) {
  blogModal.classList.remove('hidden');
  if (blog) {
    modalTitle.textContent = 'Edit Blog';
    blogIdInput.value = blog.id;
    titleInput.value = blog.title;
    contentInput.value = blog.content;
  } else {
    modalTitle.textContent = 'Create Blog';
    blogForm.reset();
    blogIdInput.value = '';
  }
}

function closeModal() {
  blogModal.classList.add('hidden');
}

function saveBlog(event) {
  event.preventDefault();
  const id = blogIdInput.value;
  const title = titleInput.value;
  const content = contentInput.value;

  if (id) {
    // Edit existing blog
    blogs = blogs.map((blog, index) =>
      index == id ? { title, content } : blog
    );
  } else {
    // Add new blog
    blogs.push({ title, content });
  }
  localStorage.setItem('blogs', JSON.stringify(blogs));
  closeModal();
  renderBlogs();
}

function editBlog(index) {
  openModal({ ...blogs[index], id: index });
}

function deleteBlog(index) {
  blogs.splice(index, 1);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  renderBlogs();
}

// Initial render
renderBlogs();
