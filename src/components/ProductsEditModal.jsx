import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ChakraProvider,
  Grid,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
const API = 'https://homologacao.windel.com.br:3000';

export default function ProductEditModal({ isOpen, onClose, selectedProduct }) {
  const [nome, setNome] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [referencia, setReferencia] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setNome(selectedProduct.nome);
      setValorVenda(String(selectedProduct.valorVenda));
      setReferencia(selectedProduct.referencia);
      setUnidadeMedida(selectedProduct.unidadeMedida);
      setFabricante(selectedProduct.fabricante);
      setEstoque(String(selectedProduct.estoque));
      setImagemProduto(selectedProduct.imagemProduto);
    }
  }, [selectedProduct]);

  const handleSubmit = async event => {
    event.preventDefault();
    // Enviar para a API
    const todo = {
      nome,
      valorVenda: parseFloat(valorVenda),
      referencia,
      unidadeMedida,
      fabricante,
      estoque: parseFloat(estoque),
      imagemProduto,
    };
    //Envio para a API
    await axios
      .put(
        `${API}/teste-front/${selectedProduct ? selectedProduct.id : ''}`,
        todo
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    onClose();
  };

  const limpCampos = () => {
    setNome('');
    setValorVenda('');
    setReferencia('');
    setUnidadeMedida('');
    setFabricante('');
    setEstoque('');
    setImagemProduto('');
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="800px" maxH="600px">
          <ModalHeader>Editar Produto</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <FormControl gridColumn="span 2">
                  <FormLabel>Nome do produto</FormLabel>
                  <Input
                    type="text"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Valor de Venda</FormLabel>
                  <Input
                    type="number"
                    value={valorVenda}
                    onChange={event => setValorVenda(event.target.value)}
                  />
                </FormControl>
                <FormControl gridColumn="span 2">
                  <FormLabel>Referencia</FormLabel>
                  <Input
                    type="text"
                    value={referencia}
                    onChange={event => setReferencia(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Unidade de Medida</FormLabel>
                  <Input
                    type="text"
                    value={unidadeMedida}
                    onChange={event => setUnidadeMedida(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Fabricante</FormLabel>
                  <Input
                    type="text"
                    value={fabricante}
                    onChange={event => setFabricante(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Estoque</FormLabel>
                  <Input
                    type="text"
                    value={estoque}
                    onChange={event => setEstoque(event.target.value)}
                  />
                </FormControl>
                <FormControl gridColumn="span 3">
                  <FormLabel>Imagem</FormLabel>
                  <Input
                    type="text"
                    value={imagemProduto}
                    onChange={event => setImagemProduto(event.target.value)}
                  />
                </FormControl>
              </Grid>
            </ModalBody>
            <Flex
              align="center"
              justify="right"
              marginBottom="10px"
              marginRight="25px"
            >
              <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                onClick={handleSubmit}
                style={{ margin: '0 4px' }}
              >
                Inserir
              </Button>
              <Button
                mt={4}
                colorScheme="red"
                type="submit"
                onClick={limpCampos}
                style={{ margin: '0 4px' }}
              >
                Apagar Campos
              </Button>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
