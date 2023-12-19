import React from "react";

function show() {
  return (
    <main>
      <header class="jumbotron">
        <div class="container text-center">
          <div>
            <h1 class="display-4">PT. Maju Mundur Sejahtera</h1>
            <span class="text-muted">
              Jln. HOS. Cjokroaminoto (Pasirkaliki) No. 900, DKI Jakarta
            </span>
          </div>
        </div>
      </header>

      <div class="container">
        <div class="row mb-3">
          <div class="col-md-12">
            <div class="form-group">
              <h3>Description</h3>
              some description of job vacancy
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12">
            <div class="form-group">
              <h3>Select position</h3>
              <table class="table table-bordered table-hover table-striped">
                <tr>
                  <th width="1">#</th>
                  <th>Position</th>
                  <th>Capacity</th>
                  <th>Application / Max</th>
                  <th rowspan="4" width="1">
                    <a href="" class="btn btn-primary btn-lg">
                      Apply for this job
                    </a>
                  </th>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Desain Grafis</td>
                  <td>3</td>
                  <td>6/12</td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Programmer</td>
                  <td>1</td>
                  <td>3/8</td>
                </tr>
                <tr class="table-warning">
                  <td>
                    <input type="checkbox" disabled />
                  </td>
                  <td>Manager</td>
                  <td>1</td>
                  <td>22/22</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <div class="d-flex align-items-center mb-3">
                <label class="mr-3 mb-0">Notes for Company</label>
              </div>
              <textarea
                class="form-control"
                cols="30"
                rows="6"
                placeholder="Explain why you should be accepted"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default show;
