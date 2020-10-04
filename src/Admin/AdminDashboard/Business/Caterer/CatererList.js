import React,{useState} from 'react'
 

const CatererList = props => {
    const [lawns, setLawn] = useState([
        {
          id: "123",
          name: "abc",
          phone: "123",
          email: "abc@abc.com",
        },
        {
          id: "123",
          name: "abc",
          phone: "123",
          email: "abc@abc.com",
        },
        {
          id: "123",
          name: "abc",
          phone: "123",
          email: "abc@abc.com",
        },
      ]);
    
      return (
        <div id="content-page" className="content-page">
          <div className="container">
            <div className="row">
             
              <div className="col-sm-12">
                <div className="iq-card">
                  <div className="iq-card-body">
                    <div className="table-responsive">
                      <table
                        id="datatable"
                        className="table table-striped table-bordered"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Business Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lawns.map((lawn, key) => {
                            return (
                              <tr>
                                <td>{lawn.id}</td>
                                <td>{lawn.name}</td>
                                <td>{lawn.phone}</td>
                                <td>{lawn.email}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}


export default CatererList
