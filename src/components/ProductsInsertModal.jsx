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
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import axios from 'axios';
const API = 'https://windelweb.windel.com.br:3000';

export default function ProductInsertModal({ isOpen, onClose }) {
  const [nome, setNome] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [referencia, setReferencia] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [estoque, setEstoque] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [produtoInserido, setProdutoInserido] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const res = await axios
        .get(API + '/teste-front')
        .then(res => res.data)
        .catch(err => console.log(err));

      setLoading(false);
      setProdutos(res);
    };
    loadData();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    // Enviar para a API, posteriorment
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

    console.log(todo);
    await axios
      .post(API + '/teste-front', todo)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    setProdutos(prevState => {
      if (Array.isArray(prevState)) {
        return [...prevState, todo];
      }
      return [todo];
    });

    setNome('');
    setValorVenda('');
    setReferencia('');
    setUnidadeMedida('');
    setFabricante('');
    setEstoque('');
    setImagemProduto('');
    setProdutoInserido(true);

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

  if (loading) {
    return (
      <div>
        <p className="loading">Carregando...</p>
      </div>
    );
  }

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="800px" maxH="600px">
          <ModalHeader>Inserir produto</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <FormControl gridColumn="span 2" isRequired>
                  <FormLabel>Nome do produto</FormLabel>
                  <Input
                    type="text"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    placeholder="Descrição"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Valor de Venda</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={FaMoneyBillAlt} color="gray.300" />}
                    />
                    <Input
                      type="number"
                      value={valorVenda}
                      onChange={event => setValorVenda(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl gridColumn="span 2" isRequired>
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
                    placeholder="URL da imagem"
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
