const jwt = require('jsonwebtoken');

const getId = () => {
  const token = localStorage.getItem("token");

    if(typeof token !== "undefined") {

      const decoded = jwt.verify(token, 3000, (err, decoded) => {
        if (err) {
          localStorage.removeItem("token")
          return false
        }

        return decoded
      })
      return decoded._id
    }
    return false
}

module.exports = { getId }
