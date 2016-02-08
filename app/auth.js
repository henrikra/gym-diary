import axios from 'axios';

export default {
  // signup: async function (body, cb) {
  //   let response = await fetch('/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   });

  //   let { success, message } = await response.json();
  //   if (success) this.login(body, cb);
  //   else cb({ success, message });
  // },

  login: function (body, cb) {
  	axios.post('/api/trainers/authenticate', body)
  		.then(({ data: { success, message, token, user } }) => {
  			if (success) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', user._id);
          sessionStorage.setItem('userEmail', user.email);
          cb({ success, message, user });
		    } else {
		      cb({ message });
		    }
  		});    
  },

  logout(cb) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    if (cb) cb();
  },

  loggedIn() {
    return !!sessionStorage.getItem('token');
  },

  getUserEmail() {
    return sessionStorage.getItem('userEmail');
  },

  getUserId() {
    return sessionStorage.getItem('userId');
  }
};
