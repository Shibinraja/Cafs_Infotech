import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RegisterForm = React.forwardRef((props, ref) => {
  const { registerDetails } = props;
  const { register, handleSubmit, watch, errors, reset } = useForm({});
  const [open, setOpen] = React.useState(false);

  const exampleInputPassword1 = React.useRef({});
  exampleInputPassword1.current = watch("exampleInputPassword1", "");

  const saveButton = React.useRef({});

  const onSubmit = (data) => {
    registerDetails(data);
    setOpen(false);
    reset();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    saveButton.current.click();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        style={{ display: "none" }}
        ref={ref}
        onClick={handleClickOpen}
      >
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register Yourself!</DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                ref={register({
                  required: "This field is required",
                })}
              ></input>
              {errors.username && <p id="error">{errors.username.message}</p>}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                ref={register({
                  required: "This field is required",
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
              ></input>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              {errors.email && <p id="error">{errors.email.message}</p>}
            </div>
            <div className="mb-3">
              <label for="date" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="DOB"
                ref={register({
                  required: "This field is required",
                })}
              ></input>
              {errors.date && <p id="error">{errors.date.message}</p>}
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="exampleInputPassword1"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              ></input>
              {errors.exampleInputPassword1 && (
                <p id="error">{errors.exampleInputPassword1.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                ref={register({
                  validate: (value) =>
                    value === exampleInputPassword1.current ||
                    "The passwords do not match",
                })}
              ></input>
              {errors.password && <p id="error">{errors.password.message}</p>}
            </div>
            <button
              style={{ display: "none" }}
              ref={saveButton}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button id="login" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="login" onClick={submit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default RegisterForm;
