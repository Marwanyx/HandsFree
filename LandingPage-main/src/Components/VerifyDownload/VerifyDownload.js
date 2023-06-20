import React from "react";
import Popup from "reactjs-popup";

import { useDisclosure } from "@chakra-ui/react";

// import modal from chakra-ui
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// chakraui import button
import { Button, Input } from "@chakra-ui/react";

// import usestate
import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { useAuth0 } from "@auth0/auth0-react";

import { useFileUpload } from "use-file-upload";

import QrScanner from "qr-scanner";

export default function VerifyDownload() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const { user, isAuthenticated, isLoading } = useAuth0();

  // Email user - post request to backend /email endpoint fetch
  const [files, selectFiles] = useFileUpload();
  const [validity, setValidity] = useState(false);
  const [fileName, setFileName] = useState("Pleae Select a File");

  useEffect(()=>{
    // fetch post
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": user.email,
      "name": user.name
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://handsfree-backend.herokuapp.com/email", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    

  }, []) // <-- empty dependency array


 

  const handleSubmit = (event) => {
    // decode QR code\
    const file = files["file"];
    if (!file) {
      return "error here";
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        // check if "RU_Hacks" is in result.data
        if (result.data.includes("RU_Hacks")) {
          // if true
          setValidity(true);
          
          var url="https://github.com/HandsFreeBrowse/App/archive/refs/heads/main.zip";
          window.open(url, '_blank');

        } else {
          // if false
          setValidity(false);    
        }
        
      })
      .catch((e) => "");
      
    console.log(validity);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="whiteButton"
        aria-label="Get Started"
        href="#"
      >
        Download
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        styles={{
          color: "white",
        }}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>
            Hello {user.name}! We sent you a license key in your email:{" "}
            {user.email}! Please submit the qr code to unlock the downlaod.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Attach the QR code sent to your email!</FormLabel>

              <Button
                onClick={() =>
                  selectFiles(
                    { accept: "image/*" },
                    ({ name, size, source, file }) => {
                      setFileName(name);
                    }
                  )
                }
              >
                Upload QR Code
                {fileName}
              </Button>

              {/* if validity == true */}
              {validity === true && (
                <Alert status="success" mt={3}>
                  <AlertIcon />
                  Success! Your download will begin shortly.
                </Alert>
              )}

              {/* if validity == false */}
              {validity === false && (
                <Alert status="error" mt={3}>
                  <AlertIcon />
                  Your QR Code was not Valid...
                </Alert>
              )}

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleSubmit()} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
