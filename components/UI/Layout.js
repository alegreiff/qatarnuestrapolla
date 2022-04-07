import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { desarrollo, elementosMenu } from "../../polla";
import { DarkModeSwitch } from "../DarkModeSwitch";
import { NavLink } from "./NavLink";
import Head from "next/head";
import Image from "next/image";

const Links = ["Calendario", "Información", "Grupos"];
const Enlaces = elementosMenu;

export const Simple = ({ children, titulo = "generico" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>{titulo}</title>
      </Head>
      <Container maxW="container.xl">
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Image
                  src={"/logo/nnpp.svg"}
                  width={160}
                  height={60}
                  alt="Nuestra Polla"
                />
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Enlaces.map((link) => (
                  <NavLink
                    key={link.id}
                    nombre={link.nombre}
                    enlace={link.enlace}
                  />
                ))}
                {/* {Links.map((link) => (
                  <NavLink key={link} nombre={link} enlace={link} />
                ))} */}
              </HStack>
            </HStack>
            <Spacer />
            <DarkModeSwitch />

            {!desarrollo && (
              <Flex alignItems={"center"} ml={5}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            )}
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {/* {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))} */}
              </Stack>
            </Box>
          ) : null}
        </Box>

        <Box p={4}> {children} </Box>
      </Container>
    </>
  );
};
