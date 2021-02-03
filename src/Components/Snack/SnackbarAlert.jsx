import { Snackbar } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

const SnackbarAlert = ({
  isOpen,
  message,
  alertType,
  multibutton,
  primaryClick,
  secondaryClick
}) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return multibutton ? (
    <Snackbar
      open={isOpen}
      onClose={primaryClick}
      anchorOrigin={{ vertical: 'top', horizontal: 'bottom' }}>
      <Alert onClose={primaryClick} severity={alertType}>
        {message}
        <CheckIcon
          style={{
            position: 'relative',
            cursor: 'pointer',
            top: '4px',
            left: '8px'
          }}
          onClick={secondaryClick}></CheckIcon>
      </Alert>
    </Snackbar>
  ) : (
    <Snackbar
      open={isOpen}
      onClose={primaryClick}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'bottom' }}>
      <>
        <Alert onClose={primaryClick} severity={alertType}>
          {message}
        </Alert>
      </>
    </Snackbar>
  )
}

export default SnackbarAlert
