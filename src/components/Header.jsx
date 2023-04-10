import { Flex, Text, Button, Icon } from '@chakra-ui/react';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import ProductInsertModal from './ProductsInsertModal';

import { useState } from 'react';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Flex display="flex" flexDirection="column" p="5px">
      <Flex justify="space-between" borderBottom="1px" p="5px" borderRadius={9}>
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight" w="64">
          Produtos
        </Text>

        <Button
          bg="green.400"
          _hover={{
            bgColor: 'green.300',
          }}
          onClick={handleOpenModal}
        >
          <ProductInsertModal isOpen={isModalOpen} onClose={handleCloseModal} />
          <Icon as={AiOutlinePlusCircle} />
          Adicionar
        </Button>
      </Flex>
    </Flex>
  );
}
