

const getId = () => {
  fetch(`${URL}/users`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        users:data.users
      })

      const token = localStorage.getItem('token')
      let base64Url = token.split('.')[1]
      let base64 = base64Url.replace('-','+').replace('_', '/')
      const t = JSON.parse(window.atob(base64))

      const currentUser = data.users.filter( user => {

        if (user.email === t.email) {
          this.setState({user: user})
          console.log(this.state.user)
        }
      })
    })
    .catch(err => {
      console.log(`err:${err}`)
    })
}

module.exports = { getId }
