import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

const ThirdPartyDetail = ({ data }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <div className='flex items-center gap-4'>
            <div className='border shadow w-20 h-20 flex items-center justify-center'>
              <i className='ri-building-4-fill text-primary text-4xl' />
            </div>

            <Typography className='text-xl font-bold'>{data.name}</Typography>
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
                  <span className='w-1/2'>{data.code_client}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Barcode</span>
                  <span className='w-1/2'>{data.barcode}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 1</span>
                  <span className='w-1/2'>{data.idprof1}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 2</span>
                  <span className='w-1/2'>{data.idprof2}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 3</span>
                  <span className='w-1/2'>{data.idprof3}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 4</span>
                  <span className='w-1/2'>{data.idprof4}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 5</span>
                  <span className='w-1/2'>{data.idprof5}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Professional ID 6</span>
                  <span className='w-1/2'>{data.idprof6}</span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>VAT ID </span>
                  <span className='w-1/2'>{data.tva_intra}</span>
                </li>
              </ul>
            </div>

            <div className='border-t-2 pt-4 mt-4 border-primary'>
              <ul className='pl-0 pt-0 grid space-y-3'>
                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Customers tags/categories</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Third-party type</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Workforce</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Business entity type</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Capital</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Refuse bulk emailings</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Default language</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Incoterms</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Currency</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Parent company</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Sales representatives</span>
                  <span className='w-1/2'></span>
                </li>

                <li className='flex items-center gap-2 justify-between text-left list-none font-medium'>
                  <span className='w-1/2'>Link to member</span>
                  <span className='w-1/2'></span>
                </li>
              </ul>
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

export default ThirdPartyDetail
