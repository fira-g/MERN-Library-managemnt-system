import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Library, LogOut, LucideMoonStar, MessagesSquare, Moon, MoonIcon, Settings, Settings2, Sun, User } from 'lucide-react'
import { useAuthUserStore } from '../store/useAuthUserStore.js'
import { useAuthAdminStore } from '../store/useAuthAdminStore.js'
import { useThemeStore } from '../store/useThemeStore.js'

const Navbar = () => {
    const {logout, authUser} = useAuthUserStore()
    const {adminLogout, authAdmin} = useAuthAdminStore()
    const {theme, setTheme,isDark} = useThemeStore()
    const [dark , setDark] = useState(isDark)
    const combinedClick = ()=>{
        setDark(!dark);
        dark?setTheme("lofi"):setTheme("dark")
    }
  return (
    <div>
      <header className=' border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 p-2'  >
      <div className="container mx-auto px-auto h-7">
      <div className=" w-full p-2 flex items-center justify-between h-full">
          <div className="left flex flex-row gap-8">
            <Link to="/" className='flex items-center gap-2 hover:opacity-80 transition-all'>
              <Library className='size-6 text-primary ' />
              
              <h1 className=''>AASTU LMS</h1>
            </Link>
          </div>
          
          <div className="right flex flex-row items-center gap-8 ">
                
              
              


              {authUser && 
              <>
                
                <Link onClick={logout} to="/user/logout" className=' flex flex-row items-center gap-2 hover:opacity-80 transition-all'>
                    <LogOut className='size-4 text-primary '/>
                    <span className='hidden sm:inline'>Log Out</span>
                </Link>
              </>
              }

            {authAdmin && 
                    <>
                        
                        <Link onClick={adminLogout} to="/admin/logout" className=' flex flex-row items-center gap-2 hover:opacity-80 transition-all'>
                            <LogOut className='size-4 text-primary '/>
                            <span className='hidden sm:inline'>Log Out</span>
                        </Link>
                    </>
                    }
              <button
                    className=''
                    onClick={()=>combinedClick()}
                    
                    >
                        {dark?
                        <Sun className='size-4'></Sun> : <MoonIcon className='size-4'></MoonIcon> 
                        }
                        
                </button>

              

              
              

          </div>
          
          
        </div>
      </div>
        
    </header>
    </div>
  )
}

export default Navbar
