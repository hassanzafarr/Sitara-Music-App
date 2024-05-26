import { CircularProgress } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import { useTheme } from '@mui/material/styles'
// import gif from '../../../images/LogoGif.gif'

const CustomLoader = ({ loading }: { loading: boolean }) => {
  const theme = useTheme()

  return (
    <Backdrop
      open={loading}
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        color: theme => theme.palette.primary.main,
        zIndex: theme => theme.zIndex.mobileStepper - 1
      }}
    >
        <CircularProgress sx={{color:'#EE4950'}} />
      {/* <img className='logo-animation' width={180} height={100} src='../../../images/LogoGif.gif' alt='' /> */}
    </Backdrop>
  )
}

export default CustomLoader
