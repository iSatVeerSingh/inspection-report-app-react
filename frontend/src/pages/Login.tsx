import { Box, Center, Heading, VStack, Text, Link } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import FormInput from "../components/FormInput";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { UserLogin } from "../utils/types";
import { isValidateLogin } from "../utils/userValidation";

const Login = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState(null);

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user: UserLogin = {
      email: formData.get("email")?.toString().trim() || "",
      password: formData.get("password")?.toString().trim() || "",
    };

    const isInvalid = isValidateLogin(user)
    if(!isInvalid) {
      setFormErrors(isInvalid);
    }

    navigate("/jobs");
  };

  return (
    <Center bg="app-bg" h="100vh" px={4}>
      <Box
        bg="main-bg"
        px={3}
        py={5}
        border="stroke"
        borderRadius="base"
        w="100%"
        maxW="2xl"
      >
        <Box textAlign="center">
          <Heading color="rich-black">Welcome Back &#128075;</Heading>
          <Text color="main-text">Let's do some inspections</Text>
        </Box>
        <VStack
          as="form"
          mt="10"
          maxW="lg"
          mx="auto"
          spacing="4"
          onSubmit={handleLogin as FormEventHandler}
        >
          <FormInput type="email" name="email" placeholder="Email" />
          <FormInput type="password" name="password" placeholder="Password" />
          <ButtonPrimary type="submit" w="full">
            Login Now
          </ButtonPrimary>
        </VStack>
        <Box textAlign="center" mt="6">
          <Link textDecoration="underline" color={"blue"}>
            Forgot Password
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
