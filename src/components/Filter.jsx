import {
  ChakraProvider,
  theme,
  Flex,
  Text,
  Button,
  Icon,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { BsTrash } from 'react-icons/bs';

export function Filter() {
  return (
    <Flex gap="10px" border="solid 1px gray" p="10px" borderRadius={9}>
      <FormControl id="nome" isRequired display="flex" flexDirection="column">
        <FormLabel>Nome</FormLabel>
        <Input placeholder="Nome" _placeholder={{ color: 'gray.400' }} />
      </FormControl>

      <FormControl
        id="referencia"
        isRequired
        display="flex"
        flexDirection="column"
      >
        <FormLabel>Referência</FormLabel>
        <Input placeholder="Referência" _placeholder={{ color: 'gray.400' }} />
      </FormControl>

      <FormControl
        id="fabricante"
        isRequired
        display="flex"
        flexDirection="column"
      >
        <FormLabel>Fabricante</FormLabel>
        <Input placeholder="Fabricante" _placeholder={{ color: 'gray.400' }} />
      </FormControl>
      <FormControl
        id="limpfiltros"
        display="flex"
        flexDir="column"
        justifyContent="end"
      >
        <Button
          bg="red.400"
          _hover={{
            bgColor: 'red.300',
          }}
        >
          <Icon as={BsTrash} />
          Limpar Filtros
        </Button>
      </FormControl>
    </Flex>
  );
}
