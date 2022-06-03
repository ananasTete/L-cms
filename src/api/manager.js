import request from '../utils/request'

export function getAllManager() {
  return request.get({
    url: '/manager'
  })
}

export function newManager(newData) {
  return request.post({
    url: `/manager`,
    data: newData
  })
}

export function editManager(newData) {
  return request.post({
    url: `/manager/${newData.id}/edit`,
    data: newData
  })
}

export function deleteManager(id) {
  return request.delete({
    url: `/manager/${id}/delete`
  })
}

export function searchManager(info) {
  return request.post({
    url: `/manager/search`,
    data: info
  })
}
