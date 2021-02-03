import React, { useRef, useState } from "react";
import "./index.css";
import "./social.css";
import icon from "../../Images/undraw_profile_pic_ic5t.svg";
import { useForm } from "react-hook-form";
import RegisterForm from "./RegisterForm";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LandingPage(props) {
  const { loginDetails ,data} = props;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const [registerData, setRegisterData] = useState(null);
  const [login, setLogin] = useState(null);
  const [open, setOpen] = React.useState(false);


React.useEffect(()=>{
  if(data!== ""){
    setOpen(true)
  }

  if(data.Message == "Login Successful"){
    window.location.href = "/table"
  }
},[data])

  const handleClose = (event) => {
    setOpen(false);
  };
  
  const onSubmit = (data) => {
    loginDetails({data:data});
    reset();
  };

  const registerbutton = useRef(null);

  const registerform = () => {
    registerbutton.current.click();
    // console.log(registerbutton)
  };

  const registerDetails = (register) => {
    loginDetails({register:register});
  };

  return (
    <div className="container-fluid">
      {data.Message == "Login Successful" ? data.statusCode == 200 ?
      ( <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">
          LoggedIn Successful
        </Alert>
      </Snackbar>) : (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          Please,Verify your email Id and password
        </Alert>
      </Snackbar>
      ) : (data.statusCode == 200 ?
        ( <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="success">
            Your Account has been registered Successfully
          </Alert>
        </Snackbar>) : <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">
          Oops ! Error due to some technical issues
        </Alert>
      </Snackbar>
      ) 
      }
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <img id="avatar" src={icon}></img>
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-4">Welcome</h3>
                  <p className="text-muted mb-4">Enter into your Portal !!!</p>
                  <React.Fragment>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group mb-3">
                        <input
                          name="email"
                          type="email"
                          placeholder="Email address"
                          ref={register({ required: true })}
                          autofocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        ></input>
                        {errors.email && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="form-group mb-3">
                        <input
                          name="password"
                          defaultValue=""
                          ref={register({ required: true })}
                          type="password"
                          placeholder="Password"
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        ></input>
                        {errors.password && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-mixed btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Sign In
                      </button>
                    </form>
                  </React.Fragment>

                  <p class="my-3">
                    Don't have an account?{" "}
                    <a id="login" onClick={registerform}>
                      Register Here
                    </a>
                  </p>

                  <React.Fragment>
                    <div className="social-buttons">
                      <a
                        href="http://www.facebook.com"
                        target="_blank"
                        className="social-buttons__button social-button social-button--facebook"
                        aria-label="Facebook"
                      >
                        <span className="social-button__inner">
                          <i className="fab fa-facebook-f"></i>
                        </span>
                      </a>
                      <a
                        href="http://www.linkedin.com"
                        target="_blank"
                        className="social-buttons__button social-button social-button--linkedin"
                        aria-label="LinkedIn"
                      >
                        <span className="social-button__inner">
                          <i className="fab fa-linkedin-in"></i>
                        </span>
                      </a>
                      <a
                        href="http://www.twitter.com"
                        target="_blank"
                        className="social-buttons__button social-button social-button--twitter"
                        aria-label="Twitter"
                      >
                        <span className="social-button__inner">
                          <i className="fab fa-twitter"></i>
                        </span>
                      </a>
                      <a
                        href="http://www.github.com"
                        target="_blank"
                        className="social-buttons__button social-button social-button--github"
                        aria-label="GitHub"
                      >
                        <span className="social-button__inner">
                          <i className="fab fa-github"></i>
                        </span>
                      </a>
                    </div>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterForm ref={registerbutton} registerDetails={registerDetails} />
    </div>
  );
}

export default LandingPage;
