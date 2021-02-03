import React from "react";
import "./body.css";
import { useForm } from "react-hook-form";
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
import SnackbarAlert from "../Snack/SnackbarAlert";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import { HighlightOff } from "@material-ui/icons";
// import ProfileEdit from "./ProfileEdit";
import { ProfileEdit as ProfileNow } from "../Container/Container";
// import ProfileEdit from "./ProfileEdit.jsx"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#343a40 !important",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

function TablePage(props) {
  const { profileCreation, profileGrasp, data, profile , updateProfileDetails , deleteprofile , deleteStatus} = props;
  const { register, handleSubmit, watch, errors, reset, setValue } = useForm(
    {}
  );
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    NodeJs: true,
    Php: true,
    MongoDB: true,
    Mysql: true,
  });
  const [Image, previewImage] = React.useState("");
  const [docopen, setDocOpen] = React.useState(false);
  const [Profile, setFile] = React.useState("");
  const [report, setReport] = React.useState([]);
  const [fileNotFound, setFileNotFound] = React.useState(false);
  const [gender, setGender] = React.useState("female");
  const [multiButton, setmultiButton] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [isSnackBarOpen, setOpenSnackBar] = React.useState(false);
  const [tableData, setData] = React.useState([]);
  const [record, setRecord] = React.useState(null);
  const [docx, setDocx] = React.useState();
  const [dtype, setDtype] = React.useState(null);
  const [docName, setName] = React.useState("");
  const [modalEdit, setEditModal] = React.useState(null);
  const [profileData, setProfileData] = React.useState(null);
  const [updateDetails , setupdateDetails] = React.useState(null)
  const [id , setId] = React.useState(null)

  const saveButton = React.useRef({});

  React.useEffect(() => {
    profileGrasp();
    setId(null)
  }, []);

  React.useEffect(()=>{
    if(updateDetails == null){
      // 
    }else{
      updateProfileDetails({updateDetails})
    }
  },[updateDetails , setupdateDetails])

  React.useEffect(() => {
    if (data == undefined) {
      //
    } else if (data?.statusCode == 200) {
      setOpenSnackBar(true);
      setSnackBarMessage("Profile added successfully!");
      setmultiButton(false);
      setAlertType("success");
      profileGrasp();
    }
  }, [data]);

  React.useEffect(() => {
    if (deleteStatus == undefined) {
      //
    } else if (deleteStatus?.statusCode == 200) {
      setOpenSnackBar(true);
      setSnackBarMessage("Profile deleted successfully!");
      setmultiButton(false);
      setAlertType("success");
      profileGrasp();
      setId(null)
    }
  }, [deleteStatus]);

  React.useEffect(()=>{
    if(id === null){
      // 
    }else{
      deleteprofile({profileId:id})
    }
  },[id , setId])

  const updateProfile = (data) => {
    setupdateDetails(data)
  };
  React.useEffect(() => {
    if (profile.data == undefined) {
      //
    } else {
      setData(profile.data);
      profile.data.map((list) => {
        let a = list.ProfileImg;
        previewImage(a);
        fetch(a)
          .then((res) => res.blob())
          .then(console.log);
      });
    }
  }, [profile]);

  const onSubmit = async (data) => {
    const file = report;
    if (report!="" && Profile != "") {
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

        profileCreation({
          ...data,
          profileImg: base64,
          docImg: base64doc,
          profileName: Profile.name,
          docName: file.name,
          Gender: gender,
          skills: state,
        });
      }
    } else {
      setOpenSnackBar(true);
      setSnackBarMessage("Profile Picture and Resume are mandatory!");
      setmultiButton(false);
      setAlertType("info");
    }
    setOpen(false);
    setReport("");
    setFileNotFound(false)
    previewImage("");
    reset();
  };

  const handleClickOpen = () => {
    setReport("");
    setFileNotFound(false)
    previewImage("");
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    saveButton.current.click();
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const hiddenFileInput = React.useRef();
  const hiddenFileInput2 = React.useRef();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleClick2 = (event) => {
    hiddenFileInput2.current.click();
  };

  const genderChange = (event) => {
    setGender(event.target.value);
    setValue("gender1", event.target.value);
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

  const handleDocClose = () => {
    setDocOpen(false);
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

  const handleFileChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let fileimage = event.target.files[0];

    reader.onloadend = () => {
      setFileNotFound(true);
      setReport(fileimage);
    };
    reader.readAsDataURL(fileimage);
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

  const viewRecordModal = (e, record) => {
    setRecord(record[0]);
    setName(record[1]);
    setDocOpen(true);
  };

  React.useEffect(() => {
    if (docName == null || docName == undefined) {
      //
    } else if (docName.split(" ").pop() == "pdf") {
      // let document_url= ` https://view.officeapps.live.com/op/view.aspx?src=${record}`
      let document_url = `https://docs.google.com/viewer?url=${record}`;
      setDocx(document_url);
      setDtype(".pdf");
    } else if (
      docName.split(".").pop() == "docx" ||
      docName.split(".").pop() == "doc"
    ) {
      // let document_url= ` https://view.officeapps.live.com/op/view.aspx?src=${record}`
      let document_url = `https://docs.google.com/viewer?url=${record}`;
      setDocx(document_url);
      setDtype(".docx");
    } else {
      setDocx(null);
    }
  }, [docName]);

  const editModal = (data) => {
    setProfileData(data);
    setEditModal(true);
  };

  const updateModal = (value) => {
    setEditModal(value);
  };

  const deleteModal = (value) =>{
    console.log(value)
    setId(value)
  }

  const logout = () =>{
    localStorage.clear()
  }

  // const downloadPDF =() =>{
  //   const linkSource = `data:application/docx;base64,${record}`;
  //   const downloadLink = document.createElement("a");
  //   const fileName = {docName};
  //   downloadLink.href = linkSource;
  //   downloadLink.download = fileName;
  //   downloadLink.click();}

  return (
    <React.Fragment>
      <ProfileNow
        profileData={profileData}
        modalEdit={modalEdit}
        profilesubmit={updateModal}
        updateProfile={updateProfile}
      />
      <Dialog
        open={docopen}
        onClose={handleDocClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Resume</DialogTitle>
        <DialogContent>
          {record ? (
            <div className={classes.fileImage}>
              <a
                download={`Resume${dtype}`}
                href={record}
                title="Download pdf document"
              >
                <u>Click to View Pdf/Document file</u>
              </a>

              {/* <img type="image/jpg" className={classes.img} src={document} /> */}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
      <SnackbarAlert
        isOpen={isSnackBarOpen}
        message={snackBarMessage}
        alertType={alertType}
        multibutton={multiButton}
        primaryClick={hideSnackBar}
      />
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-style navbar-dark bg-dark">
          <div className="navbar-header ">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarid"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-right navbar-collapse" id="navbarid">
            <h3 id="name"></h3>
            <ul className="navbar-nav ml-auto navrbar-right">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={logout}>
                  Exit
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <button
        type="submit"
        id="play"
        className="btn btn-mixed2 btn-block text-uppercase rounded-pill shadow-sm"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Create a profile
      </button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Mobile no</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Skills</StyledTableCell>
              <StyledTableCell>Email Id</StyledTableCell>
              <StyledTableCell>Profile Pic</StyledTableCell>
              <StyledTableCell align="right">Resume</StyledTableCell>
              <StyledTableCell align="right">Dob</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.Name}
                </StyledTableCell>
                <StyledTableCell>{row.Mobile}</StyledTableCell>
                <StyledTableCell>{row.Gender}</StyledTableCell>
                <StyledTableCell>{row.Role}</StyledTableCell>
                <StyledTableCell>{row.Skills}</StyledTableCell>
                <StyledTableCell>{row.Email}</StyledTableCell>
                <StyledTableCell>
                  <Avatar className={classes.AvatarCol2} src={row.ProfileImg} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    style={{ cursor: "pointer" }}
                    onClick={(e) =>
                      viewRecordModal(e, [row.DocImg, row.DocName])
                    }
                  >
                    Click to view Document
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">{row.DOB}</StyledTableCell>
                <StyledTableCell align="right">
                  <EditIcon
                    onClick={() => editModal(row)}
                    style={{ color: "blue", cursor: "pointer" }}
                  />{" "}
                  <HighlightOff  onClick={() => deleteModal(row.profileId)} style={{ color: "red", cursor: "pointer" }} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a profile!</DialogTitle>
        <DialogContent dividers>
          <Box className={classes.ModalForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  name="name"
                  ref={register({
                    required: "This field is required",
                  })}
                ></input>
                {errors.name && <p id="error">{errors.name.message}</p>}
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
                {errors.email && <p id="error">{errors.email.message}</p>}
              </div>
              <div className="mb-3">
                <label for="mobilenumber" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  aria-describedby="mobileHelp"
                  ref={register({
                    required: "Please enter a valid number with +91",
                    pattern: /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/,
                  })}
                ></input>
                {errors.mobile && <p id="error">{errors.mobile.message}</p>}
              </div>

              <div className="mb-3">
                <FormGroup row component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={gender}
                    onChange={genderChange}
                    ref={register({
                      required: "This field is required",
                    })}
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
                {errors.gender1 && <p id="error">{errors.gender1.message}</p>}
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
                {errors.DOB && <p id="error">{errors.DOB.message}</p>}
              </div>
              <div className="mb-3">
                <label for="date" className="form-label">
                  Select your role
                </label>{" "}
                <select
                  name="role"
                  ref={register({
                    required: "This field is required",
                  })}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && <p id="error">{errors.role.message}</p>}
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
                  id="file"
                  name="file"
                  type="file"
                  accept=" application/pdf, application/docx"
                  style={customStyles}
                  ref={hiddenFileInput2}
                  onChange={handleFileChange}
                  className="form-control"/>
                <label htmlFor="file-input">
                  <Button
                    variant="contained"
                    color="#111d4e"
                    size="large"
                    onClick={handleClick2}
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
                {report !="" ? (
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
          <Button id="login" onClick={submit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TablePage;
