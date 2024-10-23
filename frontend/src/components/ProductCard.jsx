
import { Box, Heading, HStack, IconButton, Image,useColorModeValue, Text, Input,
    Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
    useDisclosure,
    VStack,
 } from "@chakra-ui/react"
 import { useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { useToast } from "@chakra-ui/react"
import { useProductStore } from "../store/product.js"

// eslint-disable-next-line react/prop-types
const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const textColor = useColorModeValue("gray.700", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const toast = useToast();
    const {deleteProduct,updateProduct} = useProductStore();
    const handleDeleteProduct = async (pid) => {
        // console.log(product._id);
        const {success, message} = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: "Product Deleted Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
       
        }

    }
    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};
  return (
    <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{transform: "translateY(-5px)", boxShadow: "1xl"}}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
        <Box p={4}>
            <Heading as={"h3"} size={"md"} mb={2}>{product.name}</Heading>
            <Text fontSize={"sm"} color={textColor} mb={4}>{product.description}</Text>
            <Text fontweight={"bold"} fontSize={"xl"} color={textColor} mb={4}>${product.price}</Text>
        </Box>
        <HStack spacing={2} p={4}>
            <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme='blue' />
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
                            <Input
                                placeholder='Description'
                                name='description'
                                value={updatedProduct.description}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            />
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    </Box>
  )
}

export default ProductCard
