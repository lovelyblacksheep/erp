// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import EditUserInfo from '@components/dialogs/edit-user-info'
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomAvatar from '@core/components/mui/Avatar'
import Link from '@/components/Link'
import { getLocalizedUrl } from '@/utils/i18n'
import { useParams } from 'next/navigation'

// Vars
const userData = {
  firstName: 'Seth',
  lastName: 'Hallam',
  userName: '@shallamb',
  billingEmail: 'shallamb@gmail.com',
  status: 'active',
  role: 'Subscriber',
  taxId: 'Tax-8894',
  contact: '+1 (234) 464-0600',
  language: ['English'],
  country: 'France',
  useAsBillingAddress: true
}

const UserDetails = ({data}) => {
  // Vars
  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  const { lang: locale } = useParams()

  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <CustomAvatar
                alt='user-profile'
                src={data.logo || data.name || '/images/avatars/1.png'}
                variant='rounded'
                className='rounded-lg'
                size={120}
              />
              <Typography variant='h5'>{`${data.label}`}</Typography>
              <Chip label={`${data.status}` === '0' ? 'Pending' : `${data.status}` === '1' ? 'Active' : `${data.status}` === '9' ? 'Disabled' : 'Unknown'} variant='tonal' color={`${data.status}` === '0' ? 'info' : `${data.status}` === '1' ? 'primary' : `${data.status}` === '9' ? 'warning' : 'default'} size='small' />
            </div>
            {/* <div className='flex items-center justify-around flex-wrap gap-4'>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='ri-check-line' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>1.23k</Typography>
                  <Typography>Task Done</Typography>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <CustomAvatar variant='rounded' color='primary' skin='light'>
                  <i className='ri-briefcase-line' />
                </CustomAvatar>
                <div>
                  <Typography variant='h5'>568</Typography>
                  <Typography>Project Done</Typography>
                </div>
              </div>
            </div> */}
          </div>
          <div>
            <Typography variant='h5'>Details</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2' style={{width: "fit-content", margin: "0 auto"}}>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography color='text.primary' className='font-medium'>
                  Description:
                </Typography>
                <Typography>{data.description || "Not provided"}</Typography>
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-center'>
            {/* <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Edit', 'primary', 'contained')}
              dialog={EditUserInfo}
              dialogProps={{ data: userData }}
            /> */}
            <Button component={Link} href={getLocalizedUrl('/apps/member/bom/'+data.id+'/modify', locale)} variant='outlined'>
              Edit
            </Button>
            {/* <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Suspend', 'error', 'outlined')}
              dialog={ConfirmationDialog}
              dialogProps={{ type: 'suspend-account' }}
            /> */}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
