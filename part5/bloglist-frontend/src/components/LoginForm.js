import React from 'react'

const LoginForm = (props) => {

 return (
    <div className="card px-sm-4 mt-2 login-card hv-center shadow">
        <form className="p-2">
            <div className="form-group text-left mt-3">
            <label className="font-weight-bold">User name</label>
            <input type="text" 
                   value={props.username}
                   className="form-control" 
                   id="username" 
                   placeholder="Enter your user name"
                   onChange={({ target }) => props.setUsername(target.value)}
            />
           </div>
            <div className="form-group text-left mt-4">
                <label className="font-weight-bold">Password</label>
                <input type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={props.password}
                    onChange={({ target }) => props.setPassword(target.value)}
 
                />
            </div>
            <button  
                type="submit" 
                className="btn btn-dark my-3 px-5 submitBtn"
                onClick={props.handleLogin}
            >
                Login
            </button>
        </form>
    </div>
)
      
}

export default LoginForm