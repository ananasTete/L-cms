import request from '../utils/request'

export function getAllFlower() {
  return request.get({
    url: '/flower'
  })
}

export function newCategory(newData) {
  return request.post({
    url: `/category`,
    data: newData
  })
}

export function deleteCategory(id) {
  return request.delete({
    url: `/category/${id}`
  })
}

export function newLabel(id, newData) {
  return request.post({
    url: `/category/${id}/label`,
    data: newData
  })
}

export function deleteLabel(id, data) {
  return request.delete({
    url: `/category/label/${id}`,
    data
  })
}

export function getAllCategory() {
  return request.get({
    url: '/category/label/list'
  })
}

export function getAllOrders() {
  return request.get({
    url: '/order'
  })
}

export function putGoods(id) {
  return request.get({
    url: `/put/${id}`
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
