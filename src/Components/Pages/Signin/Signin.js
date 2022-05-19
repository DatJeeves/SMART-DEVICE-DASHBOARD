// CPSC 458-01
// Jeevan Acharya
// ID: 2313321

import {
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  useBreakpointValue,
  FormControl,
  useDisclosure,
  chakra,
  Center,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

import * as React from "react";
import { SiKasasmart } from "react-icons/si";

import { useNavigate } from "react-router";

export const Signin = (props) => {
  const { isOpen } = useDisclosure();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    const payloadData = {
      body: { command: "create_account", password: data.password },
      uuid: data.email,
    };
    const options = {
      method: "POST",
      url: "https://opentpl1.p.rapidapi.com/dev/tplapi",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "opentpl1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: payloadData,
    };
    try {
      var response = await axios.request(options);
      if (response.data.error === "UserExists") {
        setIsLoading(false);
        setErrorMessage("");
        sessionStorage.setItem("userName", data.email.toLowerCase());
        navigate("/dashboard", { replace: true });
      } else if (
        response.data.error === "false" &&
        response.data.message.status === "account_created"
      ) {
        setIsLoading(false);
        setErrorMessage("");
        sessionStorage.setItem("userName", data.email);
      } else {
        setIsLoading(false);
        setErrorMessage(response.data.error);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      console.log("🚀 ~ file: Signin.js ~ line 68 ~ onSubmit ~ error", error);
      setErrorMessage("Something went wrong/wrong username and password.");
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Center>
            <SiKasasmart size="3em" />
          </Center>

          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "sm",
              })}
            >
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                {...register("email", { required: true })}
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <InputGroup>
                <Input
                  name="password"
                  type={isOpen ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  required
                  {...props}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={isLoading}>
              Sign in
            </Button>
          </Stack>
          <Text size="xs" as="i" color="red.400">
            {errorMessage}
          </Text>
        </chakra.form>
      </Stack>
    </Container>
  );
};
