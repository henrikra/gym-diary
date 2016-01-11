export default {
  signup: async function (body, cb) {
    let response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    let { success, message } = await response.json()
    if (success) this.login(body, cb)
    else cb({ success, message })
  },

  login: async function (body, cb) {
    let response = await fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    let { success, message, token, user } = await response.json()

    if (success) {
      localStorage.token = token
      localStorage.userId = user._id
      localStorage.userEmail = user.email
      cb({ success, message, user })
    }
    else {
      cb({ message })
    }
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
  },

  loggedIn() {
    return !!localStorage.token
  },

  getUserEmail() {
    return localStorage.userEmail
  },
}