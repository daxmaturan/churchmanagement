app.controller("appController", [
  "$scope",
  "$http",
  function (state, http) {

    const validatator = (params, param2) => {
      if (!params) {
        alert(`PLEASE INPUT ${param2}`);
        return null;
      }
    };


    state.signin = () => {
      if (!state.password || !state.email) {
        validatator(state.username, "USER NAME");
        validatator(state.password, "PASSWORD");
      } else {
        http
          .post("/api/signin", {
            username: state.username,
            password: state.password
          })
        // .then(res => {
        //   alert(res.data);
        // })
      }
    };
  }
]);
