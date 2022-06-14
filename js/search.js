function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}
if (getCookie(`alert`) == `allreadyread`) {
  document.getElementById('alert').style.display = 'none'
}
document.getElementById('close-alert').addEventListener('click', () => {
  document.cookie = 'alert=allreadyread'
})

document.getElementById('form').onsubmit = (evt) => {
  evt.preventDefault()
  document.getElementById(
    'jumbotron'
  ).innerHTML = `<div class="d-flex" style=""><div class="spinner-grow mx-auto" role="status"><span class="sr-only">Загрузка...</span>`

  let searchStr = document.getElementById('search-field').value
  searchStr = searchStr.toLowerCase()
  searchStr = searchStr.split(' ')
  searchStr.sort()

  let readyList = ''
  for (let i = 0; i < data.studDocs.length; i++) {
    let nStr = data.studDocs[i].name.toLowerCase()
    nStr = nStr.split(' ')
    nStr.sort()
    for (let j = 0; j < searchStr.length; j++) {
      if (nStr.includes(searchStr[j]) && j == searchStr.length - 1) {
        readyList =
          readyList +
          `<h5 class="">${data.studDocs[i].studNum} <small class="text-muted">${data.studDocs[i].name}</small></h5>`
      } else if (nStr.includes(searchStr[j])) {
        continue
      } else {
        break
      }
    }
  }

  if (readyList != '') {
    document.getElementById('jumbotron').innerHTML = readyList
  } else {
    document.getElementById('jumbotron').innerHTML = `😥 Ничего не найдено.`
  }
}
