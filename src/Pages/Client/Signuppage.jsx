import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "../../Components/Client/Layout/Layout";
import { useForm } from "react-hook-form";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectLoggedInUser } from "../../Features/Authslice";


export default function Signuppage() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

    const {
        register, 
        handleSubmit,
        formState : { errors },
    } = useForm();

    const onSubmit = data => {
        dispatch(
          createUserAsync({
            email: data.email,
            password: data.password,
            addresses: [],
            role:'user'
          })
        );
    }

    if(user){
      return <Navigate to='/Loginpage'/>
    }


    return (
      <>
      <Layout>
          
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 mt-20">
        <div className="border-1 sm:mx-auto sm:w-full sm:max-w-sm px-2 py-1 rounded-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <UserCircleIcon className="w-10 h-10 mx-auto"/>
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign up
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {
                      ...register('email', {
                        required: true,
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Updated regex for email validation
                          message: 'Invalid email address' // Optional: Custom error message
                        }
                      })
                    }
                    name="email"
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {
                    errors.email && (<> <span className="text-rose-600">{errors.email.message}</span> </>)
                  }
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {
                        ...register('password' , {required : true,
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Password validation pattern
                            message: 'Password must be at least 8 characters long, include at least one letter, one number, and one special character'
                          }
                        })
                    }
                    name="password"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {
                     errors.password && (<> <span className="text-rose-600">{errors.password.message}</span> </>)
                  }
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confpassword"
                    {
                        ...register('confpassword', {required : true,
                             validate: (value, formValues) => value === formValues.password || 'password not match'
                        })
                    }
                    name="confpassword"
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {
                     errors.confpassword && (<> <span className="text-rose-600">{errors.confpassword.message}</span> </>)
                  }
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
             Already have an account?{' '}
             <Link to={'/Loginpage'}>
             <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                sign in
              </a>
             </Link>
          
            </p>
          </div>
        </div>
        </div>

      </Layout>
      </>
    )
  }
  