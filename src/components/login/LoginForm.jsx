import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import tw from "tailwind-styled-components";

import { loginUserThunk } from "../../redux/modules/users";
import { checkEmail, checkPassword } from "../../utils/validation";

import Button from "../../elem/Button";
import Logo from "../common/Logo";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
    checkEmail(e.target.value)
      ? setEmailError("")
      : setEmailError("이메일 형식이 아닙니다");
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordError(checkPassword(e.target.value));
  };

  const signIn = async (e) => {
    e.preventDefault();

    const user = { email, password };
    console.log(user);
    const signInResponse = await dispatch(loginUserThunk(user));
    console.log(signInResponse);
    if (signInResponse.error) {
      const errorCode = signInResponse.payload;
      console.log(errorCode);
      setLoginError(errorCode);
    } else {
      navigate("/main");
    }
  };

  return (
    <Form onSubmit={signIn}>
      <FormContainer>
        <LogBox>
          <Logo />
        </LogBox>

        <div>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmailHandler}
            autoComplete="false"
            required
          />
          <p>{emailError}</p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePasswordHandler}
            autoComplete="false"
            required
          />
          <p>{passwordError}</p>
        </div>
        <p>{loginError}</p>
        <Button type="button">이메일로 로그인</Button>
      </FormContainer>
    </Form>
  );
};

const Form = tw.form`
max-w-lg
border
rounded-lg
mx-auto
`;

const FormContainer = tw.div`
flex
flex-col
gap-4
p-4
md:m-8
`;

const LogBox = tw.div`
flex 
self-center
`;

const Input = tw.input`
w-full
text-gray-800
border-b
focus:border-b-black
bg-transparent
outline-none
transition
duration-100
px-3
py-2
my-4
`;

export default LoginForm;
