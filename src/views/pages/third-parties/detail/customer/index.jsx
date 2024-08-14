import { Button, Card, CardContent, Typography } from '@mui/material'

const counts = [
  {
    label: 'Proposals',
    value: 0.0
  },
  {
    label: 'Orders',
    value: 0.0
  },
  {
    label: 'Invoices',
    value: 0.0
  },
  {
    label: 'Current...',
    value: 0.0
  }
]

const ThirdPartyCustomerComponent = () => {
  return (
    <div>
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

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div className='border-t-2 pt-4 mt-4 border-primary'>
              <ul className='pl-0 pt-0 grid space-y-3'>
                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Nature of Third party</span>
                  <span className='w-1/2'>
                    <span>
                      <span className='bg-green-500 w-5 h-5 text-white text-center rounded-sm block text-sm'>C</span>
                    </span>
                  </span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Customer Code</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Customer accounting code</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>VAT ID</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Payment Terms</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Payment method</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Payment bank account</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Relative discount</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Absolute discount</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Max. for outstanding bill</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Customers tags/categories</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Sales representatives</span>
                  <span className='w-1/2 text-black/40'>No particular sales representative assigned</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Link to member</span>
                  <span className='w-1/2 text-black/40'>Third party not linked to a member</span>
                </li>
              </ul>
            </div>

            <div className='border-t-2 pt-4 mt-4 border-primary'>
              <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-[450px] mx-auto'>
                {counts.map(item => (
                  <div className='bg-gray-200 rounded-sm p-2 grid gap-1.5 text-center'>
                    <p className='flex items-center justify-center gap-2 text-sm font-medium text-black'>
                      <i class='ri-file-3-fill text-base text-green-600'></i> {item.label}
                    </p>
                    <p className='text-primary'>{item.value} Riyal</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='mt-5 flex items-center justify-end gap-3'>
        <Button type='button' variant='contained'>
          Modify
        </Button>

        <Button type='button' variant='contained' className='bg-gray-500'>
          Merge
        </Button>

        <Button type='button' variant='contained' className='bg-red-500'>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ThirdPartyCustomerComponent
