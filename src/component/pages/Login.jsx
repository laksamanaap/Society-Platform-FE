import React from "react";

const Login = () => {
  return (
    <div>
      <main>
        <header class="jumbotron">
          <div class="container text-center">
            <h1 class="display-4">Job Seekers Platform</h1>
          </div>
        </header>

        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <form class="card card-default">
                <div class="card-header">
                  <h4 class="mb-0">Login</h4>
                </div>
                <div class="card-body">
                  <div class="form-group row align-items-center">
                    <div class="col-4 text-right">ID Card Number</div>
                    <div class="col-8">
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group row align-items-center">
                    <div class="col-4 text-right">Password</div>
                    <div class="col-8">
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group row align-items-center mt-4">
                    <div class="col-4"></div>
                    <div class="col-8">
                      <button class="btn btn-primary">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
