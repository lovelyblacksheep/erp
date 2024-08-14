import ContactTable from '@/views/pages/third-parties/detail/contact/table'
import { Card, CardContent, Typography } from '@mui/material'

const ThirdPartyContact = () => {
  return (
    <>
      <Card>
        <CardContent>
          <div className='flex items-center justify-between gap-5'>
            <div className='flex items-center gap-4'>
              <div className='border shadow w-20 h-20 flex items-center justify-center'>
                <i className='ri-building-4-fill text-primary text-4xl' />
              </div>

              <Typography className='text-xl font-bold'>TakePOS عام العميل</Typography>
            </div>

            <div>
              <span className='bg-teal-500 text-white inline-block rounded px-3 py-2 font-semibold'>Open</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='mt-5'>
        <ContactTable />
      </div>
    </>
  )
}

export default ThirdPartyContact
