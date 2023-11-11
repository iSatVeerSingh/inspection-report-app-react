import {
  Box,
  Center,
  Heading,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import FormInput from "../components/FormInput";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../types";
import { validateLogin } from "../utils/validation";
import { loginUser } from "../services/api";
import { UserDB } from "../services/clientdb";

const Login = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<Partial<UserLogin> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const loginData: UserLogin = {
      email: formData.get("email")?.toString().trim() || "",
      password: formData.get("password")?.toString().trim() || "",
    };

    const isInvalid = validateLogin(loginData);
    if (isInvalid !== null) {
      setFormErrors(isInvalid);
      return;
    }

    setFormErrors(null);
    setLoading(true);

    const response = await loginUser(loginData);
    if (response.status !== 200) {
      setFormErrors({
        email: response.data.message,
        password: response.data.message,
      });
      setLoading(false);
      return;
    }

    await UserDB.user.clear();
    await UserDB.user.add({
      user: "user",
      ...response.data,
    });
    setLoading(false);
    navigate('/init')
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
          <Heading color="rich-black">Welcome &#128075;</Heading>
          <Text color="main-text">Let's do some inspections</Text>
        </Box>
        <form onSubmit={handleLogin}>
          <VStack mt="10" maxW="lg" mx="auto" spacing="4">
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              required
              inputError={formErrors?.email}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              required
              inputError={formErrors?.password}
            />
            <ButtonPrimary
              type="submit"
              w="full"
              loadingText="Logging in..."
              isLoading={loading}
            >
              Login Now
            </ButtonPrimary>
          </VStack>
        </form>
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
