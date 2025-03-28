import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, UserIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems } from '../../../Features/Cartslice'
import { selectLoggedInUser } from '../../../Features/Authslice'
import { useEffect } from 'react'
import { UsersIcon } from '@heroicons/react/16/solid'

const navigation = [
  { name: 'Adminhome', link: '/Adminhomepage', user: true },
  { name: 'AdminOrders', link: '/Adminorderpage', user: true },
  // { name: 'Products', link: '/Adminhomepage', admin: true },
  // { name: 'Orders', link: '/Adminorderpage', admin: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const cartitem = useSelector(selectCartItems)


  
      // Check if the token and role are in localStorage when the page loads
      const token = localStorage.getItem('token');
      const role = JSON.parse(localStorage.getItem('role'));


  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className='fixed top-0 left-0  right-0 z-50 bg-gray-800'>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between z-300">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to={'/'}>
              <img
                alt="Your Company"
                src="https://marketplace.canva.com/EAFzjXx_i5w/1/0/1600w/canva-blue-illustrative-e-commerce-online-shop-logo-fZejT2DpGCw.jpg"
                className="h-10 w-auto rounded-full"
              />
              </Link>
        
            </div>
            <div className='bg-gray-900 ml-3 p-2 text-gray-300 hover:bg-gray-700 hover:text-white'>
              Compny name
            </div>
            
            {/* <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              {navigation.map((item) => (
                  // Check if the user is allowed to see this link based on their role
                    <Link
                      key={item.name}
                      to={item.link}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  
                ))}
              </div>
            </div> */}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link to={'/Cartpage'}>
            {
              role === 'user' && (
                <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <ShoppingCartIcon aria-hidden="true" className="size-6" />
                <span>{cartitem.length}</span>
              </button>
              )
            }
        
            </Link>
            <Link to={'Loginpage'}>
            <button
              type="button"
              className=" bg-gray-900 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                      'rounded px-3 py-2 text-sm font-medium text-white ml-2"
            >
              Login
            </button>
            </Link>
          
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={<UserIcon />}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <Link
                  to={'/Userprofilepage'}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                  to={'/Orderpage.jsx'}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    My Orders
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                  to={'/Logoutpage'}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>

      </div>

    </Disclosure>
  )
}
