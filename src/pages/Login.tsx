import React, { useRef, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'
import tw from "tailwind-styled-components"
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/userSlice';

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
const SingInButton = tw.button`
group
relative 
w-full 
flex 
justify-center 
py-2 
px-4 
my-2
border 
border-transparent 
text-sm 
font-medium 
rounded-md 
text-white 
bg-indigo-600 
hover:bg-indigo-700 
focus:outline-none 
focus:ring-2 
focus:ring-offset-2 
focus:ring-indigo-500
`


const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const emailRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const dispatch = useDispatch()

    const signIn = async () => {
      setAuthing(true)
      if(emailRef.current && passwordRef.current) {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        try {
          await signInWithEmailAndPassword(auth,email,password)
          dispatch(setUserInfo({email:email}))
          setAuthing(false)
          navigate('/')
        } catch(error) {
          alert('가입된 사용자가 아닙니다')
          emailRef.current.value = ''
          passwordRef.current.value = ''
        }
      }
    }
    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
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
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
            <SingInButton onClick={() => signIn()} disabled={authing} type="submit">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </SingInButton>
              <div style={{textAlign:'center', margin:'10px 0'}}>OR</div>
              <SingInButton onClick={() => signInWithGoogle()} disabled={authing} type="submit">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in With Google
              </SingInButton>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default LoginPage;
