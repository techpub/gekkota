module.exports = function filter (object) {
  return {
    id: object.id,
    data: object.filter(object.response)
  }
}
