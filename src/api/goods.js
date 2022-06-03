import request from '../utils/request'

export function getAllFlower() {
  return request.get({
    url: '/flower'
  })
}

export function getAllCategory() {
  return request.get({
    url: '/category/label/list'
  })
}

export function newFlower(newData) {
  return request.post({
    url: `/flower`,
    data: newData
  })
}

export function editFlower(newData) {
  return request.post({
    url: `/flower/${newData.id}/edit`,
    data: newData
  })
}

export function deleteFlower(id) {
  return request.delete({
    url: `/flower/${id}/delete`
  })
}

export function searchFlower(info) {
  return request.post({
    url: '/flower/options/search',
    data: info
  })
}
