const courseApi = "http://localhost:3000/course";
// start
function start() {
  getCourses(renderCourse);
  handleCreateForm();
}
start();
//read course
function getCourses(callback) {
  fetch(courseApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderCourse(courses) {
  const listCoursesBlock = document.querySelector(".list-courses");
  const htmls = courses.map(function (course) {
    return `<li class ="course-item-${course.id}">
      <h4>${course.name}</h4>
      <p>${course.description}</p>
      <button onclick="deleteCourse(${course.id})">Delete</button>
      <button onclick="handleEditCourse(${course.id})">Edit</button>
    </li>`;
  });
  listCoursesBlock.innerHTML = htmls.join("");
}
// create course
function createCourse(data, callback) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(courseApi, option)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleCreateForm() {
  const createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    const name = document.querySelector("input[name='name']");
    const description = document.querySelector("input[name='description']");
    const formData = {
      name: name.value,
      description: description.value,
    };
    createCourse(formData, function () {
      getCourses(renderCourse);
    });
  };
}
//delete course
function deleteCourse(id) {
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(courseApi + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      const courseItem = document.querySelector(".course-item-" + id);
      if (courseItem) {
        courseItem.remove();
      }
    });
}
// edit course
function editCourse(data, id) {
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  +fetch(courseApi + "/" + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      getCourses(renderCourse);
    });
}
function handleEditCourse(id) {
  const name = document.querySelector("input[name='name']");
  const description = document.querySelector("input[name='description']");
  const data = {
    name: name.value,
    description: description.value,
  };
  editCourse(data, id);
}
