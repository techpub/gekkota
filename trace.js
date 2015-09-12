module.exports = function trace(reason) {
  console.log(reason);
  console.log(reason.stack);
}
