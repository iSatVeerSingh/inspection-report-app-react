"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

const OfflineModal = ({ isOffline, setIsOffline }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOffline) {
      onOpen();
    }
  }, [isOffline]);

  const handleCloseModal = () => {
    setIsOffline(false);
    onClose();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          You are offline. Please connect to the internet to perform this
          action.
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseModal}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OfflineModal;
