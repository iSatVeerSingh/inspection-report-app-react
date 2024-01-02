import { Box, Center, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import ButtonPrimary from "../components/ButtonPrimary";
import { FormEventHandler, useState } from "react";
import { loginUser } from "../api";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

export type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<Partial<LoginData> | null>(null);
  const [logging, setLogging] = useState(false);
  const toast = useToast();

  const onSubmitLoginForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email")?.toString().trim() as string;
    const password = formData.get("password")?.toString().trim() as string;
    if (!email || email === "") {
      setFormErrors({ email: "Email is required" });
      return;
    }
    if (!password || password === "") {
      setFormErrors({ password: "Password is required" });
      return;
    }
    setFormErrors(null);
    setLogging(true);
    const response: AxiosResponse = await loginUser({ email, password });
    if (response.status !== 200) {
      toast({
        title: response.data.message || "Invalid request",
        status: "error",
        duration: 4000,
      });
      setLogging(false);
      return;
    }

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));

    if ("serviceWorker" in navigator) {
      let serviceWorker: ServiceWorker;
      const registration = await navigator.serviceWorker.register(
        import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
        { type: import.meta.env.MODE === "production" ? "classic" : "module" }
      );
      if (registration.installing) {
        serviceWorker = registration.installing;
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
      } else if (registration.active) {
        serviceWorker = registration.active;
      }
      if (serviceWorker!) {
        serviceWorker.addEventListener("statechange", (e) => {
          if ((e.currentTarget as ServiceWorker).state === "activated") {
            console.log("Service worker activated");
            setLogging(false);
            navigate("/init");
          }
        });
      }
    }
  };

  return (
    <Center as="main" h={"100vh"} bg={"app-bg"}>
      <Card p={5} maxW={"2xl"} w={"100%"}>
        <Box textAlign={"center"}>
          <Text fontSize={"lg"} color={"text.700"}>
            Inspection Report App By Correct Inspections
          </Text>
          <Heading color={"text.800"}>Welcome &#128075;</Heading>
        </Box>
        <form onSubmit={onSubmitLoginForm}>
          <VStack>
            <FormInput
              type="email"
              id="email"
              label="Email"
              name="email"
              placeholder="exmaple: john@gmail.com"
              inputError={formErrors?.email}
              isRequired
            />
            <FormInput
              type="password"
              id="password"
              label="Password"
              name="password"
              placeholder="exmaple: John@123"
              inputError={formErrors?.password}
              isRequired
            />
          </VStack>
          <ButtonPrimary
            type="submit"
            mt={3}
            w={"full"}
            loadingText="Logging in"
            isLoading={logging}
          >
            Login
          </ButtonPrimary>
        </form>
      </Card>
    </Center>
  );
};

export default Login;
