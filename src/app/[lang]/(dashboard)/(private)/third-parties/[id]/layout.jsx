import Link from '@/components/Link'
import { Box, Tab, Tabs } from '@mui/material'

const tabs = [
  {
    label: 'Third-party',
    href: '/'
  },
  {
    label: 'Contacts/Addresses',
    href: '/'
  },
  {
    label: 'Customer',
    href: '/'
  },
  {
    label: 'Projects',
    href: '/'
  },
  {
    label: 'Related items',
    href: '/'
  },
  {
    label: 'Payment methods',
    href: '/'
  },
  {
    label: 'Partnerships',
    href: '/'
  },
  {
    label: 'Tickets',
    href: '/'
  },
  {
    label: 'Margins',
    href: '/'
  },
  {
    label: 'Notifications',
    href: '/'
  },
  {
    label: 'Notes',
    href: '/'
  },
  {
    label: 'Linked files',
    href: '/'
  },
  {
    label: 'Events/Agenda',
    href: '/'
  }
]

const ThirdPartyLayout = ({ children }) => {
  return (
    <div>
      <div className='mb-5'>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant='scrollable' scrollButtons='auto'>
              {tabs.map(item => (
                <Link href={item.href}>
                  <Tab style={{whiteSpace: "nowrap"}} label={item.label} />
                </Link>
              ))}
            </Tabs>
          </Box>
        </Box>
      </div>

      {children}
    </div>
  )
}

export default ThirdPartyLayout
