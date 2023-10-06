import { Box, Center, Heading, VStack, Text, Link } from "@chakra-ui/react";
import FormInput from "../components/FormInput";
import ButtonPrimary from "../components/ButtonPrimary";

const Login = () => {
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
        <VStack as="form" mt="10" maxW="lg" mx="auto" spacing="4">
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
