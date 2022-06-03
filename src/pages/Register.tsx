import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'
import tw from "tailwind-styled-components"

export interface ILoginPageProps {}

const CustomInput = tw.input`
appearance-none
rounded-none 
relative
block
w-full
px-3
py-2
border
border-gray-300 
placeholder-gray-500 
text-gray-900 
rounded-b-md 
focus:outline-none 
focus:ring-indigo-500 
focus:border-indigo-500 
focus:z-10 sm:text-sm
`


const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const navigate = useNavigate();
    const auth = getAuth()
    const [authing, setAuthing] = useState(false);
    const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const passwordConfirmRef = useRef<HTMLInputElement>()
    
    const signup = async () => {
      setAuthing(true)
      if(emailRef.current && passwordRef.current && passwordConfirmRef.current) {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const passwordConfirm = passwordConfirmRef.current.value
        if(password != passwordConfirm) {
          alert('비밀번호를 다르게 입력하셨습니다')
          emailRef.current.value=''
          passwordRef.current.value=''
          passwordConfirmRef.current.value=''
          return 
        }
        await createUserWithEmailAndPassword(auth,email,password)
      }
      setAuthing(false)
      navigate('/')
    }


    return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <CustomInput
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="이메일을 입력하세요"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <CustomInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="비밀번호를 입력하세요"
                  ref={passwordRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <CustomInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="비밀번호를 다시 한 번 입력하세요"
                  ref={passwordConfirmRef}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button onClick={signup} disabled={authing}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                  회원 가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default LoginPage;
