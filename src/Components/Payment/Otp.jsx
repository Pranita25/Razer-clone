import React, { useState } from "react";
import {
  Box,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  PinInput,
  PinInputField,
  ModalFooter,
  Center,
  useToast,
  Text
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

function Otp(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  
  const [otp, setOtp] = useState(""); 
  const toast = useToast(); 
  
  // handle OTP validation
  const handleOtpValidation = () => {
    if (otp === "1234") {
      navigate("/successfulPayment")
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  
  return (
    <div>
        <Button
          mt={4}
          onClick={onOpen}
          rightIcon={<ArrowRightIcon />}
          bg="#44d62c"
          color="black"
          variant="solid"
        >
          Confirm Payment
        </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color={"white"}>Enter OTP</ModalHeader>
          <Text color={"white"}>Temp otp: 1234</Text>
          <ModalCloseButton color="gray" />

          <ModalBody>
            <Center>
              <HStack>
                <PinInput
                  focusBorderColor="rgb(69,214,43)"
                  type="number"
                  onChange={(value) => setOtp(value)} 
                >
                  <PinInputField color={"white"} />
                  <PinInputField color={"white"} />
                  <PinInputField color={"white"} />
                  <PinInputField color={"white"} />
                </PinInput>
              </HStack>
            </Center>
          </ModalBody>
          <Center>
            <ModalFooter>
            {/* call handleOtpValidation on button click */}
              <Button
                mt={4}
                onClick={handleOtpValidation}
                rightIcon={<ArrowRightIcon />}
                bg="#44d62c"
                color="black"
                variant="solid"
              >
                Submit OTP
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </div>
  );
}

export { Otp };
