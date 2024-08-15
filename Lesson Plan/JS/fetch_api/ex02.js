//* Config

const serverApi = 'http://localhost:3000'
const params = { _sort: 'id', _order: 'desc', _page: 1, _limit: 3 }
const infoPage = { userNumber: 0, totalPages: 1 }

//* Render layout

const renderTable = (users) => {
  let stt = (params._page - 1) * params._limit + 1
  const tbody = document.querySelector('.table tbody')
  tbody.innerHTML = `${users
    .map(
      ({ id, name, email, status }) => `<tr>
        <td class="text-center">${stt++}</td>
        <td>${name.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</td>
        <td>${email.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</td>
        <td>
            <span class="badge bg-${status === 'active' ? 'success' : 'secondary'}">${
        status === 'active' ? 'Kích hoạt' : 'Chưa kích hoạt'
      }</span>
        </td>
        <td><button class="btn btn-warning" data-id="${id}" data-action="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Sửa</button></td>
        <td><button class="btn btn-danger btn-delete" data-id="${id}" data-action="delete">Xóa</button></td>
        </tr>`
    )
    .join('')}`
}

const renderPagination = (totalPages) => {
  const nav = document.querySelector('.pagination-view')

  nav.innerHTML = `
      <ul class="pagination pagination-sm">
       ${
         params._page > 1
           ? `<li class="page-item">
                <a class="page-link page-prev" href="#" aria-label="Previous">&laquo;</a>
              </li>`
           : ''
       }
        ${
          totalPages > 1
            ? [...Array(totalPages)]
                .map(
                  (_, index) =>
                    `<li class="page-item"><a class="page-number page-link ${
                      index === params._page - 1 ? 'active' : ''
                    }" href="#">${index + 1}</a></li>`
                )
                .join('')
            : ''
        }
        ${
          params._page < totalPages
            ? `<li class="page-item">
                <a class="page-link page-next" href="#" aria-label="Next">&raquo;</a>
              </li>`
            : ''
        }
      </ul>`
}

//* Handle API

const getListUser = async (params = {}) => {
  let query = new URLSearchParams(params).toString()

  if (query) {
    query = '?' + query
  }

  const response = await fetch(serverApi + '/users' + query)
  const users = await response.json()

  const totalUsers = response.headers.get('X-Total-Count')
  infoPage.totalPages = Math.ceil(totalUsers / params._limit)
  infoPage.userNumber = users.length
  renderTable(users)
  renderPagination(infoPage.totalPages)
}

const getUser = async (id) => {
  try {
    if (!id) {
      throw new Error('ID không tồn tại')
    }
    //Call API
    const response = await fetch(`${serverApi}/users/${id}`)
    if (!response.ok) {
      throw new Error('User không tồn tại')
    }
    const user = await response.json()
    fillUserFormUpdate(user)
  } catch (e) {
    Swal.fire({
      title: e.message,
      icon: 'error'
    })
  }
}

//* Handle CRUD

const addUser = async (data) => {
  try {
    const response = await fetch(serverApi + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return response.ok
  } catch (error) {
    return false
  }
}

const updateUser = async (id, data) => {
  try {
    if (!id) {
      throw new Error('ID not exist')
    }
    const response = await fetch(`${serverApi}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Update Failed')
    }
    getListUser(params) //Cập nhật lại table
    Swal.fire({
      title: 'Cập nhật thành công',
      icon: 'success'
    })
    document.querySelector('.cancel-update-user').click()
  } catch (e) {
    Swal.fire({
      title: e.message,
      icon: 'error'
    })
  }
}

const deleteUser = async (id) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Chắc chưa?',
    text: 'Có không giữ mất đừng tìm',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Ok, Quất!',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Thôi'
  })

  if (isConfirmed) {
    //Call API
    const response = await fetch(`${serverApi}/users/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      if (params._page === infoPage.totalPages && infoPage.userNumber === 1) {
        //Trang cuối
        params._page--
      }

      Swal.fire({
        title: 'Xóa rồi!',
        text: 'Người dùng đã bị xóa.',
        icon: 'success'
      })
      getListUser(params)
    }
  }
}

//* Handle event

const addEventFilterForm = () => {
  const form = document.querySelector('.filter-form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const { status, keyword } = Object.fromEntries([...new FormData(form)])

    if (status === 'active' || status === 'inactive') {
      params.status = status
      // ?status=active
      // ?status=inactive
    } else {
      delete params.status
    }

    if (keyword) {
      params.q = keyword
      // ?q=...
      // ?status=...&q=...
    } else {
      delete params.q
    }

    getListUser(params)
  })
}

const addEventSortUser = () => {
  const sortBtns = document.querySelectorAll('.sort-user')
  sortBtns.forEach((btn) => {
    btn.addEventListener('click', ({ target }) => {
      // ?_sort=id&_order=desc
      // ?_sort=id&_order=asc

      if (!target.classList.contains('active')) {
        sortBtns.forEach((btn) => btn.classList.remove('active'))
        target.classList.add('active')
      }

      params._order = target.dataset.value === 'latest' ? 'desc' : 'asc'

      getListUser(params)
    })
  })
}

const addEventActionBtn = () => {
  const tbody = document.querySelector('.table tbody')
  tbody.addEventListener('click', ({ target }) => {
    switch (target.dataset.action) {
      case 'edit':
        getUser(target.dataset.id)
        break

      case 'delete':
        deleteUser(target.dataset.id)
        break

      default:
        break
    }
  })
}

const addEventPaginationBtns = () => {
  const paginationView = document.querySelector('.pagination-view')
  paginationView.addEventListener('click', ({ target }) => {
    const pageBeforeChange = params._page

    switch (true) {
      case target.classList.contains('page-number'):
        params._page = +target.textContent
        break
      case target.classList.contains('page-next'):
        params._page++
        break
      case target.classList.contains('page-prev'):
        params._page--
        break
      default:
        break
    }

    if (pageBeforeChange !== params._page) {
      getListUser(params)
    }
  })
}

const addEventFormSubmit = () => {
  const form = document.querySelector('.form-update')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form))
    if (!form.dataset.id) {
      const status = await addUser(formData)
      if (status) {
        params._page = 1
        params._order = 'desc'
        getListUser(params)
        form.reset()
        Swal.fire({
          title: 'Thêm thành công',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Thêm thất bại',
          icon: 'error'
        })
      }
    } else {
      const id = form.dataset.id
      //Call API Update user
      updateUser(id, formData)
    }
  })
}

//* Helper

const fillUserFormUpdate = ({ id, name, email, status }) => {
  const form = document.querySelector('.form-update')
  form.previousElementSibling.innerText = `Cập nhật người dùng`
  form.dataset.id = id
  form.elements.name.value = name
  form.elements.email.value = email
  form.elements.status.value = status

  const btnSubmit = form.querySelector('[type="submit"]')
  btnSubmit.innerText = 'Cập nhật'

  const cancelBtn = document.createElement('button')
  cancelBtn.classList.add('btn', 'btn-danger', 'cancel-update-user')
  cancelBtn.innerText = 'Hủy'

  if (!form.lastElementChild.classList.contains('btn-danger')) {
    form.append(cancelBtn)
  }

  cancelBtn.addEventListener('click', () => {
    form.previousElementSibling.innerText = `Thêm người dùng`
    form.reset()
    delete form.dataset.id
    btnSubmit.innerText = 'Tạo'
    cancelBtn.remove()
  })
}

//* Start

getListUser(params)
addEventFormSubmit()
addEventActionBtn()
addEventFilterForm()
addEventSortUser()
addEventPaginationBtns()
