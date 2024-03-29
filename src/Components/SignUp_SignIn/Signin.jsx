import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  HStack,
  Divider,
  useToast
} from "@chakra-ui/react";
import { BsFacebook, BsTwitch } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SiAccenture } from "react-icons/si";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { loginSucess } from "../../Redux/ProductData/productAction";
import { useDispatch, useSelector } from "react-redux";
function Signin(props) {
  const toast = useToast();
  //eye button
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const BASE_URL = process.env.REACT_APP_API

  const isAuth = useSelector((state) => {
    return state.productReducer.isAuth;
  });
  if (isAuth) {
    toast({
      title: "Login Successfull",
      description: "You have successfully login.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/");
  }

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validation()) {
      let loginSuccessful = false; 
      fetch(`${BASE_URL}/users`)
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          response.map((ele, i) => {
            if (ele.email === email && ele.password === password) {
              loginSuccessful = true; 
              return; 
            }
          });
          if (loginSuccessful) {
          } else {
            toast({
              title: "Wrong Credentials",
              description: "Enter the correct Credentials.",
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
            // toast.warning("Enter correct Credentials"); 
          }
        })
        .catch((err) => {
          toast({
            title: "Login Failed",
            description: "Login failed due to :" + err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          // toast.error("Login failed due to :" + err.message);
        });
    }
    dispatch(loginSucess(email, password));
  };
  

  //validation
  const validation = () => {
    let result = true;
    let errormessage = "Please enter your ";
    if (email === null || email === "") {
      result = false;
      errormessage += " Email";
    }
    if (password === null || password === "") {
      result = false;
      errormessage += " Password";
    }
    if (!result) {
      toast({
        title: "Login failed",
        description:   errormessage,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      // toast.warning(errormessage);
    } else {
      if (email.includes("@")) {
      } else {
        result = false;
        toast({
          title: "Invalid Email",
          description: "Please enter the valid Email",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        // toast.warning("Please enter the valid Email");
      }
    }
    return result;
  };

  const handleClick = () => setShow(!show); //eye

  return (
    <div
      style={{
        backgroundImage:
          "url(https://razerid-assets.razerzone.com/static/media/serpents-eye-v2-20220906.dae1e41f.jpg)",
        backgroundPosition: "center top -150px",
        height: "100vh", // move image 50px up from the center
      }}
    >
      <Center>
        <Box
          border={"2px"}
          borderColor={"green"}
          mt="20px"
          w="412px"
          h="560px"
          bg="#000000"
        >
          <Heading
            ml="20px"
            my="30px"
            as={"h1"}
            fontWeight={"thin"}
            color={"white"}
            size="lg"
          >
            RAZER ID LOGIN
          </Heading>
          <form>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="20px"
              width="375px"
              ml={"20px"}
              isRequired="true"
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
              type="email"
              placeholder="EMAIL ADDRESS"
            ></Input>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="375px"
                ml={"20px"}
                color={"white"}
                focusBorderColor="rgb(69,214,43)"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  colorScheme="liquid"
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? (
                    <Icon boxSize={7} as={FiEye}></Icon>
                  ) : (
                    <Icon boxSize={7} as={FiEyeOff}></Icon>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              _hover={{ color: "green" }}
              cursor={"pointer"}
              mt={2}
              mr={5}
              mb={8}
              textAlign={"right"}
              text
              fontWeight={"light"}
              color={"white"}
            >
              Forgot Password
            </Text>

            <Center>
              <Button
                onClick={proceedLogin}
                colorScheme="green"
                color="black"
                px="160px"
              >
                LOG IN
              </Button>
            </Center>
            <Center>
              <Text color={"white"} fontSize={"13px"} mb="20px" mt={8}>
                Don't have an account yet?
              </Text>
            </Center>
            <Center>
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color={"white"}
                rightIcon={<SiAccenture sixe="12px" />}
                colorScheme="blue"
                variant="unstyled"
              >
                <Link to={"/signup"}>Create Razer ID</Link>
              </Button>
            </Center>
            <HStack m="auto" w="380px" my={4}>
              <Divider orientation="horizontal" />
              <Text color={"#73767B"}>or</Text>
              <Divider orientation="horizontal" />
            </HStack>
            <Stack ml="20px" mt="10px" mb="50px" direction="row" spacing={4}>
              <Button
                px="45px"
                leftIcon={<BsFacebook boxSize="30" />}
                colorScheme="facebook"
                variant="solid"
                aria-label="Facebook"
              ></Button>
              <Button
                px="45px"
                leftIcon={<AiFillGoogleCircle boxSize="30" />}
                colorScheme="gray"
                variant="solid"
                aria-label="Google"
              ></Button>
              <Button
                px="45px"
                leftIcon={<BsTwitch boxSize="30" />}
                colorScheme="purple"
                variant="solid"
                title="Twitch"
              ></Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </div>
  );
}

export { Signin };
