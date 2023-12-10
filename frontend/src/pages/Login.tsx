import { Box, Center, Heading, VStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import FormInput from "../components/FormInput";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../types";
import { loginUser } from "../services/api";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const onFormSubmit = async (formData: any) => {
    setLoading(true);

    const response = await loginUser(formData);
    if (response.status !== 200) {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 4000,
      });
      setLoading(false);
      return;
    }

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(
          import.meta.env.MODE === "production"
            ? "/sw.js"
            : "/dev-sw.js?dev-sw",
          { type: import.meta.env.MODE === "production" ? "classic" : "module" }
        )
        .then((registration) => {
          let serviceWorker;
          if (registration.installing) {
            serviceWorker = registration.installing;
          } else if (registration.waiting) {
            serviceWorker = registration.waiting;
          } else if (registration.active) {
            serviceWorker = registration.active;
          }
          if (serviceWorker) {
            serviceWorker.addEventListener("statechange", (e) => {
              if ((e.currentTarget as ServiceWorker).state === "activated") {
                console.log("aciiiii");
                setLoading(false);
                navigate("/init");
              }
            });
          }
        });
    }
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
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <VStack mt="10" maxW="lg" mx="auto" spacing="4">
            <FormInput
              id="email"
              type="email"
              placeholder="Email"
              inputError={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              inputError={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
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
      </Box>
    </Center>
  );
};

export default Login;
