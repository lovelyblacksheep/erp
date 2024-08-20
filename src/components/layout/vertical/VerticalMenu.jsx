// Next Imports
import { useParams, usePathname, useRouter } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import Link from '@/components/Link'

// React Imports
import { useState, useEffect } from 'react'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('')
  const [openSubMenus, setOpenSubMenus] = useState([])

  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  useEffect(() => {
    const handleRouteChange = url => {
      const pathParts = url.split('/')
      const lastPart = pathParts[pathParts.length - 1]
      const searchParams = new URLSearchParams(url.split('?')[1])
      const type = searchParams.get('type')

      if (lastPart === 'add') {
        setActiveItem(`new-${type || 'third-party'}`)
      } else {
        setActiveItem(lastPart)
      }

      // Keep relevant submenus open based on the current path
      const relevantSubMenus = pathParts.slice(1, -1) // Exclude locale and last part
      setOpenSubMenus(prev => {
        const newOpenSubMenus = [...new Set([...prev, ...relevantSubMenus])]
        return newOpenSubMenus
      })
    }
  }, [pathname])

  const isActive = itemId => activeItem === itemId

  const handleItemClick = (itemId, href) => {
    setActiveItem(itemId)
    router.push(href)
  }

  const handleSubMenuToggle = label => {
    setOpenSubMenus(prev => (prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]))
  }

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <SubMenu
          label={dictionary['navigation'].dashboards}
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='5' size='small' color='error' />}
          open={openSubMenus.includes('dashboards')}
          onOpenChange={() => handleSubMenuToggle('dashboards')}
        >
          <MenuItem
            href={`/${locale}/dashboards/crm`}
            active={isActive('crm')}
            onClick={() => handleItemClick('crm', `/${locale}/dashboards/crm`)}
          >
            {dictionary['navigation'].crm}
          </MenuItem>
          <MenuItem
            href={`/${locale}/dashboards/analytics`}
            active={isActive('analytics')}
            onClick={() => handleItemClick('analytics', `/${locale}/dashboards/analytics`)}
          >
            {dictionary['navigation'].analytics}
          </MenuItem>
          <MenuItem
            href={`/${locale}/dashboards/ecommerce`}
            active={isActive('ecommerce')}
            onClick={() => handleItemClick('ecommerce', `/${locale}/dashboards/ecommerce`)}
          >
            {dictionary['navigation'].eCommerce}
          </MenuItem>
          <MenuItem
            href={`/${locale}/dashboards/academy`}
            active={isActive('academy')}
            onClick={() => handleItemClick('academy', `/${locale}/dashboards/academy`)}
          >
            {dictionary['navigation'].academy}
          </MenuItem>
          <MenuItem
            href={`/${locale}/dashboards/logistics`}
            active={isActive('logistics')}
            onClick={() => handleItemClick('logistics', `/${locale}/dashboards/logistics`)}
          >
            {dictionary['navigation'].logistics}
          </MenuItem>
        </SubMenu>

        {/* <SubMenu label={dictionary['navigation'].thirdParties} icon={<i className='ri-building-4-line' />}>
          <SubMenu label={dictionary['navigation'].thirdParty} href={`/${locale}/third-parties`}>
            <MenuItem href={`/${locale}/third-parties/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/third-parties/add`}>{dictionary['navigation'].add}</MenuItem>
          </SubMenu>
        </SubMenu> */}

        <SubMenu
          label={dictionary['navigation'].thirdParties}
          icon={<i className='ri-building-4-line' />}
          open={openSubMenus.includes('third-parties')}
          onOpenChange={() => handleSubMenuToggle('third-parties')}
        >
          <SubMenu
            label={dictionary['navigation'].thirdParty}
            href={`/${locale}/third-parties`}
            open={openSubMenus.includes('third-party')}
            onOpenChange={() => handleSubMenuToggle('third-party')}
          >
            <MenuItem
              href={`/${locale}/third-parties/add?type=third-party`}
              active={isActive('new-third-party')}
              onClick={() => handleItemClick('new-third-party', `/${locale}/third-parties/add?type=third-party`)}
            >
              {dictionary['navigation'].newThirdParty}
            </MenuItem>
            <MenuItem
              href={`/${locale}/third-parties/list`}
              active={isActive('list')}
              onClick={() => handleItemClick('list', `/${locale}/third-parties/list`)}
            >
              {'Third Party list'}
            </MenuItem>

            <SubMenu
              label={dictionary['navigation'].list}
              open={openSubMenus.includes('list')}
              onOpenChange={() => handleSubMenuToggle('list')}
            >
              <MenuItem
                href={`/${locale}/third-parties/prospects/list`}
                active={isActive('prospects')}
                onClick={() => handleItemClick('prospects', `/${locale}/third-parties/prospects/list`)}
              >
                {dictionary['navigation'].listOfProspects}
              </MenuItem>
              <MenuItem
                href={`/${locale}/third-parties/add?type=prospect`}
                active={isActive('new-prospect')}
                onClick={() => handleItemClick('new-prospect', `/${locale}/third-parties/add?type=prospect`)}
              >
                {dictionary['navigation'].newProspect}
              </MenuItem>
              <MenuItem
                href={`/${locale}/third-parties/customers/list`}
                active={isActive('customers')}
                onClick={() => handleItemClick('customers', `/${locale}/third-parties/customers/list`)}
              >
                {dictionary['navigation'].listOfCustomers}
              </MenuItem>
              <MenuItem
                href={`/${locale}/third-parties/add?type=customer`}
                active={isActive('new-customer')}
                onClick={() => handleItemClick('new-customer', `/${locale}/third-parties/add?type=customer`)}
              >
                {dictionary['navigation'].newCustomer}
              </MenuItem>
              <MenuItem
                href={`/${locale}/third-parties/vendors/list`}
                active={isActive('vendors')}
                onClick={() => handleItemClick('vendors', `/${locale}/third-parties/vendors/list`)}
              >
                {dictionary['navigation'].listOfVendors}
              </MenuItem>
              <MenuItem
                href={`/${locale}/third-parties/add?type=vendor`}
                active={isActive('new-vendor')}
                onClick={() => handleItemClick('new-vendor', `/${locale}/third-parties/add?type=vendor`)}
              >
                {dictionary['navigation'].newVendor}
              </MenuItem>
            </SubMenu>

            <MenuItem
              href={`/${locale}/third-parties/categories`}
              active={isActive('categories')}
              onClick={() => handleItemClick('categories', `/${locale}/third-parties/categories`)}
            >
              {dictionary['navigation'].customerProspectTagsCategories}
            </MenuItem>
            <MenuItem
              href={`/${locale}/third-parties/vendors/tags`}
              active={isActive('tags')}
              onClick={() => handleItemClick('tags', `/${locale}/third-parties/vendors/tags`)}
            >
              {dictionary['navigation'].vendorTagsCategories}
            </MenuItem>
          </SubMenu>

          <SubMenu
            label={dictionary['navigation'].contactsAddresses}
            icon={<i className='ri-contacts-line' />}
            open={openSubMenus.includes('contacts')}
            onOpenChange={() => handleSubMenuToggle('contacts')}
          >
            <MenuItem
              href={`/${locale}/contacts/add`}
              active={isActive('new-contact')}
              onClick={() => handleItemClick('new-contact', `/${locale}/contacts/add`)}
            >
              {dictionary['navigation'].newContactAddress}
            </MenuItem>

            <SubMenu
              label={dictionary['navigation'].list}
              open={openSubMenus.includes('contacts-list')}
              onOpenChange={() => handleSubMenuToggle('contacts-list')}
            >
              <MenuItem
                href={`/${locale}/contacts/prospects/list`}
                active={isActive('contact-prospects')}
                onClick={() => handleItemClick('contact-prospects', `/${locale}/contacts/prospects/list`)}
              >
                {dictionary['navigation'].prospects}
              </MenuItem>
              <MenuItem
                href={`/${locale}/contacts/customers/list`}
                active={isActive('contact-customers')}
                onClick={() => handleItemClick('contact-customers', `/${locale}/contacts/customers/list`)}
              >
                {dictionary['navigation'].customers}
              </MenuItem>
              <MenuItem
                href={`/${locale}/contacts/vendors/list`}
                active={isActive('contact-vendors')}
                onClick={() => handleItemClick('contact-vendors', `/${locale}/contacts/vendors/list`)}
              >
                {dictionary['navigation'].vendors}
              </MenuItem>
              <MenuItem
                href={`/${locale}/contacts/others/list`}
                active={isActive('contact-others')}
                onClick={() => handleItemClick('contact-others', `/${locale}/contacts/others/list`)}
              >
                {dictionary['navigation'].other}
              </MenuItem>
            </SubMenu>

            <MenuItem
              href={`/${locale}/third-parties/contacts/tags`}
              active={isActive('contact-tags')}
              onClick={() => handleItemClick('contact-tags', `/${locale}/contacts/tags`)}
            >
              {dictionary['navigation'].contactsTagsCategories}
            </MenuItem>
          </SubMenu>
        </SubMenu>

        <SubMenu
          label={dictionary['navigation'].mrp}
          icon={<i className='ri-building-4-line' />}
          href={`/${locale}/mrp`}
          open={openSubMenus.includes('mrp')}
          onOpenChange={() => handleSubMenuToggle('mrp')}
        >
          <SubMenu
            label={dictionary['navigation'].bom}
            open={openSubMenus.includes('bom')}
            onOpenChange={() => handleSubMenuToggle('bom')}
          >
            <MenuItem
              href={`/${locale}/mrp/bom/add`}
              active={isActive('new-bom')}
              onClick={() => handleItemClick('new-bom', `/${locale}/mrp/bom/add`)}
            >
              {dictionary['navigation'].new_bom}
            </MenuItem>
            <MenuItem
              href={`/${locale}/mrp/bom/list`}
              active={isActive('bom-list')}
              onClick={() => handleItemClick('bom-list', `/${locale}/mrp/bom/list`)}
            >
              {dictionary['navigation'].list}
            </MenuItem>
          </SubMenu>
          <SubMenu
            label={dictionary['navigation'].mo}
            open={openSubMenus.includes('mo')}
            onOpenChange={() => handleSubMenuToggle('mo')}
          >
            <MenuItem
              href={`/${locale}/mrp/mo/add`}
              active={isActive('new-mo')}
              onClick={() => handleItemClick('new-mo', `/${locale}/mrp/mo/add`)}
            >
              {dictionary['navigation'].new_mo}
            </MenuItem>
            <MenuItem
              href={`/${locale}/mrp/mo/list`}
              active={isActive('mo-list')}
              onClick={() => handleItemClick('mo-list', `/${locale}/mrp/mo/list`)}
            >
              {dictionary['navigation'].list}
            </MenuItem>
          </SubMenu>
          <SubMenu
            label={dictionary['navigation'].workstations}
            open={openSubMenus.includes('workstations')}
            onOpenChange={() => handleSubMenuToggle('workstations')}
          >
            <MenuItem
              href={`/${locale}/mrp/workstations/add`}
              active={isActive('new-workstation')}
              onClick={() => handleItemClick('new-workstation', `/${locale}/mrp/workstations/add`)}
            >
              {dictionary['navigation'].new_workstation}
            </MenuItem>
            <MenuItem
              href={`/${locale}/mrp/workstations/list`}
              active={isActive('workstation-list')}
              onClick={() => handleItemClick('workstation-list', `/${locale}/mrp/workstations/list`)}
            >
              {dictionary['navigation'].list}
            </MenuItem>
          </SubMenu>
        </SubMenu>

        {/* <SubMenu label={dictionary['navigation'].frontPages} icon={<i className='ri-file-copy-line' />}>
          <MenuItem href='/front-pages/landing-page' target='_blank'>
            {dictionary['navigation'].landing}
          </MenuItem>
          <MenuItem href='/front-pages/pricing' target='_blank'>
            {dictionary['navigation'].pricing}
          </MenuItem>
          <MenuItem href='/front-pages/payment' target='_blank'>
            {dictionary['navigation'].payment}
          </MenuItem>
          <MenuItem href='/front-pages/checkout' target='_blank'>
            {dictionary['navigation'].checkout}
          </MenuItem>
          <MenuItem href='/front-pages/help-center' target='_blank'>
            {dictionary['navigation'].helpCenter}
          </MenuItem>
        </SubMenu>
        <MenuSection label={dictionary['navigation'].appsPages}>
          <SubMenu label={dictionary['navigation'].eCommerce} icon={<i className='ri-shopping-bag-3-line' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <SubMenu label={dictionary['navigation'].products}>
              <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem href={`/${locale}/apps/ecommerce/products/add`}>{dictionary['navigation'].add}</MenuItem>
              <MenuItem href={`/${locale}/apps/ecommerce/products/category`}>
                {dictionary['navigation'].category}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].orders}>
              <MenuItem href={`/${locale}/apps/ecommerce/orders/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem
                href={`/${locale}/apps/ecommerce/orders/details/5434`}
                exactMatch={false}
                activeUrl='/apps/ecommerce/orders/details'
              >
                {dictionary['navigation'].details}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].customers}>
              <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem
                href={`/${locale}/apps/ecommerce/customers/details/879861`}
                exactMatch={false}
                activeUrl='/apps/ecommerce/customers/details'
              >
                {dictionary['navigation'].details}
              </MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}/apps/ecommerce/manage-reviews`}>
              {dictionary['navigation'].manageReviews}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/referrals`}>{dictionary['navigation'].referrals}</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>{dictionary['navigation'].settings}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].academy} icon={<i className='ri-graduation-cap-line' />}>
            <MenuItem href={`/${locale}/apps/academy/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/my-courses`}>{dictionary['navigation'].myCourses}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/course-details`}>
              {dictionary['navigation'].courseDetails}
            </MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].logistics} icon={<i className='ri-car-line' />}>
            <MenuItem href={`/${locale}/apps/logistics/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/logistics/fleet`}>{dictionary['navigation'].fleet}</MenuItem>
          </SubMenu>
          <MenuItem
            href={`/${locale}/apps/email`}
            icon={<i className='ri-mail-open-line' />}
            exactMatch={false}
            activeUrl='/apps/email'
          >
            {dictionary['navigation'].email}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/chat`} icon={<i className='ri-wechat-line' />}>
            {dictionary['navigation'].chat}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='ri-calendar-line' />}>
            {dictionary['navigation'].calendar}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/kanban`} icon={<i className='ri-drag-drop-line' />}>
            {dictionary['navigation'].kanban}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].invoice} icon={<i className='ri-bill-line' />}>
            <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem
              href={`/${locale}/apps/invoice/preview/4987`}
              exactMatch={false}
              activeUrl='/apps/invoice/preview'
            >
              {dictionary['navigation'].preview}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/invoice/edit/4987`} exactMatch={false} activeUrl='/apps/invoice/edit'>
              {dictionary['navigation'].edit}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].add}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].user} icon={<i className='ri-user-line' />}>
            <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='ri-lock-2-line' />}>
            <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].pages} icon={<i className='ri-layout-left-line' />}>
            <MenuItem href={`/${locale}/pages/user-profile`}>{dictionary['navigation'].userProfile}</MenuItem>
            <MenuItem href={`/${locale}/pages/account-settings`}>{dictionary['navigation'].accountSettings}</MenuItem>
            <MenuItem href={`/${locale}/pages/faq`}>{dictionary['navigation'].faq}</MenuItem>
            <MenuItem href={`/${locale}/pages/pricing`}>{dictionary['navigation'].pricing}</MenuItem>
            <SubMenu label={dictionary['navigation'].miscellaneous}>
              <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
                {dictionary['navigation'].comingSoon}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
                {dictionary['navigation'].underMaintenance}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
                {dictionary['navigation'].pageNotFound404}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
                {dictionary['navigation'].notAuthorized401}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].authPages} icon={<i className='ri-shield-keyhole-line' />}>
            <SubMenu label={dictionary['navigation'].login}>
              <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
                {dictionary['navigation'].loginV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
                {dictionary['navigation'].loginV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].register}>
              <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
                {dictionary['navigation'].registerV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
                {dictionary['navigation'].registerV2}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
                {dictionary['navigation'].registerMultiSteps}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].verifyEmail}>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
                {dictionary['navigation'].verifyEmailV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
                {dictionary['navigation'].verifyEmailV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].forgotPassword}>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].resetPassword}>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
                {dictionary['navigation'].resetPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
                {dictionary['navigation'].resetPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].twoSteps}>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
                {dictionary['navigation'].twoStepsV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
                {dictionary['navigation'].twoStepsV2}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].wizardExamples} icon={<i className='ri-git-commit-line' />}>
            <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].checkout}</MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
              {dictionary['navigation'].propertyListing}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
              {dictionary['navigation'].createDeal}
            </MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='ri-tv-2-line' />}>
            {dictionary['navigation'].dialogExamples}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].widgetExamples} icon={<i className='ri-bar-chart-box-line' />}>
            <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].basic}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].advanced}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
              {dictionary['navigation'].statistics}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].charts}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/gamification`}>
              {dictionary['navigation'].gamification}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].actions}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].formsAndTables}>
          <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='ri-layout-4-line' />}>
            {dictionary['navigation'].formLayouts}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='ri-checkbox-multiple-line' />}>
            {dictionary['navigation'].formValidation}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='ri-git-commit-line' />}>
            {dictionary['navigation'].formWizard}
          </MenuItem>
          <MenuItem href={`/${locale}/react-table`} icon={<i className='ri-table-alt-line' />}>
            {dictionary['navigation'].reactTable}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-radio-button-line' />}
          >
            {dictionary['navigation'].formELements}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-table-2' />}
          >
            {dictionary['navigation'].muiTables}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].chartsMisc}>
          <SubMenu label={dictionary['navigation'].charts} icon={<i className='ri-bar-chart-2-line' />}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem>
          </SubMenu>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-pantone-line' />}
          >
            {dictionary['navigation'].foundation}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-toggle-line' />}
          >
            {dictionary['navigation'].components}
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-menu-search-line' />}
          >
            {dictionary['navigation'].menuExamples}
          </MenuItem>
          <MenuItem
            href='https://pixinvent.ticksy.com'
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-lifebuoy-line' />}
          >
            {dictionary['navigation'].raiseSupport}
          </MenuItem>
          <MenuItem
            href='https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation'
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
            icon={<i className='ri-book-line' />}
          >
            {dictionary['navigation'].documentation}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].others} icon={<i className='ri-more-line' />}>
            <MenuItem suffix={<Chip label='New' size='small' color='info' />}>
              {dictionary['navigation'].itemWithBadge}
            </MenuItem>
            <MenuItem
              href='https://pixinvent.com'
              target='_blank'
              suffix={<i className='ri-external-link-line text-xl' />}
            >
              {dictionary['navigation'].externalLink}
            </MenuItem>
            <SubMenu label={dictionary['navigation'].menuLevels}>
              <MenuItem>{dictionary['navigation'].menuLevel2}</MenuItem>
              <SubMenu label={dictionary['navigation'].menuLevel2}>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>{dictionary['navigation'].disabledMenu}</MenuItem>
          </SubMenu>
        </MenuSection> */}
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 17 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
