import React from "react";
import { useFormik } from "formik";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Avatar, Box, useTheme, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SnackbarAlert from "../Snack/SnackbarAlert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileEdit(props) {
  const { profileData, modalEdit, profilesubmit, updateProfile } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [Profile, setFile] = React.useState("");
  const [Image, previewImage] = React.useState("");
  const [gender, setGender] = React.useState("f");
  const [state, setState] = React.useState({
    NodeJs: false,
    Php: false,
    MongoDB: false,
    Mysql: false,
  });
  const [fileNotFound, setFileNotFound] = React.useState(false);
  const [report, setReport] = React.useState([]);
  const [multiButton, setmultiButton] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [isSnackBarOpen, setOpenSnackBar] = React.useState(false);

  React.useEffect(() => {
    if (modalEdit == null) {
      //
    } else if (modalEdit == false) {
      setOpen(false);
    } else {
      setOpen(!false);
      previewImage(profileData?.ProfileImg);
      setReport(profileData?.DocImg);
      setFileNotFound(true);
      setGender(profileData?.Gender);
      formik.setFieldValue("gender1", profileData?.Gender);
      profileData?.Skills.map((list) => {
        state[list] = true;
      });
    }
  }, [modalEdit]);

  const saveButton = React.useRef({});

  const handleClose = () => {
    profilesubmit(false);
    setOpen(false);
  };

  const hiddenFileInput = React.useRef();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handlePicChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let fileimage = event.target.files[0];

    reader.onloadend = () => {
      setFile(fileimage);
      previewImage(reader.result);
    };
    reader.readAsDataURL(fileimage);
  };

  const genderChange = (event) => {
    setGender(event.target.value);
    formik.setFieldValue("gender1", event.target.value);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleFileChange = (event) => {
    setFileNotFound(true);
    setReport(event.target.files);
  };

  const customStyles = {
    height: "100%",
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: "99",
    cursor: "pointer",
    display: "none",
    /*This makes the button huge. If you want a bigger button, increase the font size*/
    fontSize: "50px",
    /*Opacity settings for all browsers*/
    opacity: "0",
    mozOpacity: "0",
    msFilter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
  };

  const profileSubmit = (e) => {
    saveButton.current.click();
  };

  const submit = async (data) => {
    const file = report[0];
    if (report === profileData?.DocImg && Image == profileData?.ProfileImg) {
      updateProfile({
        ...data,
        profileImg: Image,
        docImg: report,
        profileName: profileData?.ProfileName,
        DocName: profileData?.DocName,
        Gender: gender,
        skills: state,
        profileId:profileData?.profileId
      });
    } else if (report.length && Profile != "") {
      if (
        Profile.name.split(".").pop().search("pdf") === 0 ||
        Profile.name.split(".").pop().search("docx") === 0
      ) {
        setOpenSnackBar(true);
        setSnackBarMessage(
          "Pdf and Docx file are not supported for profile picture!"
        );
        setmultiButton(false);
        setAlertType("info");
      } else if (
        file.name.split(".").pop().search("jpg") === 0 ||
        file.name.split(".").pop().search("png") === 0 ||
        file.name.split(".").pop().search("jpeg") === 0
      ) {
        setOpenSnackBar(true);
        setSnackBarMessage("Jpg and Png file are not supported for Resume!");
        setmultiButton(false);
        setAlertType("info");
      } else if (
        Profile.name.split(".").pop().search("pdf") !== 0 ||
        Profile.name.split(".").pop().search("docx") !== 0 ||
        file.name.split(".").pop().search("jpg") !== 0 ||
        file.name.split(".").pop().search("png") !== 0 ||
        file.name.split(".").pop().search("jpeg") !== 0
      ) {
        let base64 = await convertBase64(Profile);
        let base64doc = await convertBase64(file);
        // let format = base64.split(",");
        // let docformat = base64doc.split(",");

        updateProfile({
          ...data,
          profileImg: base64,
          docImg: base64doc,
          profileName: Profile.name,
          docName: file.name,
          Gender: gender,
          skills: state,
          profileId:profileData?.profileId
        });
      }
    } else {
      setOpenSnackBar(true);
      setSnackBarMessage("Profile Picture and Resume are mandatory!");
      setmultiButton(false);
      setAlertType("info");
    }
    profilesubmit(false);
    setOpen(false);
    setReport("");
    previewImage("");
    formik.resetForm();
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const hideSnackBar = () => {
    setOpenSnackBar(false);
  };

  const formik = useFormik({
    initialValues: {
      name: profileData?.Name,
      email: profileData?.Email,
      mobile: profileData?.Mobile,
      gender1: profileData?.Gender,
      DOB: profileData?.DOB,
      role: profileData?.Role,
    },
    enableReinitialize: true,
    onSubmit: submit,
  });

  return (
    <div>
      <SnackbarAlert
        isOpen={isSnackBarOpen}
        message={snackBarMessage}
        alertType={alertType}
        multibutton={multiButton}
        primaryClick={hideSnackBar}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update profile!</DialogTitle>
        <DialogContent dividers>
          <Box className={classes.ModalForm}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                style={{
                  width: "140px",
                  height: "140px",
                  background: "white",
                  borderRadius: "50%",
                  boxShadow: `0 1px 1px rgba(0,0,0,0.12), 
                              0 2px 2px rgba(0,0,0,0.12), 
                              0 4px 4px rgba(0,0,0,0.12), 
                              0 8px 8px rgba(0,0,0,0.12),
                              0 16px 16px rgba(0,0,0,0.12)`,
                  margin: "25px auto",
                  textAlign: "right",
                  padding: "10px",
                  display: "flex",
                }}
              >
                {Image ? (
                  <Avatar className={classes.AvatarCol} src={Image} />
                ) : null}
              </Box>
              <label
                style={{
                  textAlign: "center",
                  margin: "20px auto",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <Button
                    onClick={handleClick}
                    style={{
                      width: "140px",
                      borderRadius: "50px",
                      background: "#343a40",
                      border: "none",
                      height: "40px",
                      textAlign: "center",
                      color: "#fff",
                      // lineHeight: '40px',
                      cursor: "pointer",
                    }}
                  >
                    Edit Picture
                  </Button>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept=" image/jpeg, image/png"
                    ref={hiddenFileInput}
                    style={customStyles}
                    onChange={handlePicChange}
                    className="form-control"
                  />
                </div>
              </label>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                ></input>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  aria-describedby="emailHelp"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                ></input>
              </div>
              <div className="mb-3">
                <label for="mobilenumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="mobile"
                  aria-describedby="mobileHelp"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                ></input>
              </div>

              <div className="mb-3">
                <FormGroup row component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={gender}
                    onChange={genderChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormGroup>
              </div>
              <div className="mb-3">
                <label for="date" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="DOB"
                  onChange={formik.handleChange}
                  value={formik.values.DOB}
                ></input>
              </div>
              <div className="mb-3">
                <label for="date" className="form-label">
                  Select your role
                </label>{" "}
                <select
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="mb-3">
                <label for="skills" className="form-label">
                  Skills
                </label>
                <FormGroup marginY={2} row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.NodeJs}
                        onChange={handleChange}
                        name="NodeJs"
                      />
                    }
                    label="Node Js"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Php}
                        onChange={handleChange}
                        name="Php"
                      />
                    }
                    label="Php"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.MongoDB}
                        onChange={handleChange}
                        name="MongoDB"
                      />
                    }
                    label="Mongo DB"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Mysql}
                        onChange={handleChange}
                        name="Mysql"
                      />
                    }
                    label="MySql"
                  />
                </FormGroup>
              </div>

              <Box>
                <input
                  accept=".pdf,.doc"
                  className={classes.uploadInput}
                  id="file-input"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input">
                  <Button
                    variant="contained"
                    color="#111d4e"
                    size="large"
                    className={classes.button}
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Resume
                  </Button>
                </label>
                {fileNotFound == false ? (
                  <p className="h4" className={classes.error}>
                    File is mandatory
                  </p>
                ) : (
                  ""
                )}
                {report == undefined ? null : report.length ? (
                  <p className="h4" className={classes.fileUploaded}>
                    File Uploaded
                  </p>
                ) : null}
              </Box>
              <button
                style={{ display: "none" }}
                ref={saveButton}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button id="login" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="login" onClick={profileSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  AvatarCol: {
    width: "100%",
    height: "100%",
  },
  AvatarCol2: {
    width: "45%",
    height: "65px",
  },
  uploadInput: {
    display: "none",
  },
  error: {
    color: theme.palette.error.main,
  },
  fileUploaded: {
    color: theme.palette.success.main,
    margin: "8px 0",
  },
  ModalForm: {
    width: "100%",
    padding: "40px",
    "@media (max-width:767px)": {
      padding: "20px",
      height: "400px",
      overflowY: "auto",
    },
  },
  table: {
    position: "relative",
    marginTop: "10%",
  },
}));
