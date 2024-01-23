import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Select,
  Spinner,
  Tooltip,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Avatar,
  Center,
  Card,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Badge,
  Icon,
  FormControl,
  FormLabel,
  Switch,
  Input,
} from "@chakra-ui/react";
import useUsers, { UsersData } from "../hooks/users/useUsers";
import useUsersQuery from "../store";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import useUsersEdit from "../hooks/users/useUsersEdit";
import db from "../components/common/db";
import { CiSearch } from "react-icons/ci";

const UsersDashboard = () => {
  const { data: usersData, error, isLoading } = useUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editUsers, setEditUsers] = useState<UsersData | null>(null);
  const [searchUserEmail, setUserSearchEmail] = useState<string>("");

  const users = useUsersQuery((s) => s.usersData);

  const setNextPage = useUsersQuery((s) => s.setUsersDataPage);
  const setUsersDataLimit = useUsersQuery((s) => s.setUsersDataPageSize);
  const setUsersDataPage = useUsersQuery((s) => s.setUsersDataPage);
  const setUsersEmail = useUsersQuery((s) => s.setUsersEmail);

  const isPrevButtonDisabled = (page: number) => page === 1;
  const isNextButtonDisabled = (page: number, totalCount: number) =>
    users.pageSize ? page * users?.pageSize >= totalCount : false;

  const currentUser = db();
  const handleEdit = (user: UsersData) => {
    if (currentUser?.email !== user.email) {
      setEditUsers(user);
      onOpen();
    }
  };
  const userAdd = useUsersEdit(editUsers?._id ?? "", onClose);

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    if (editUsers) userAdd.mutate(editUsers);
  };

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      <Heading
        fontSize={{ base: "1xl", lg: "2xl" }}
        mb={{ base: 15, lg: 5 }}
        mt={{ base: 5, lg: 0 }}
      >
        Users
      </Heading>
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex gap={4}>
          <Select
            width={{ base: "100%", md: "200px" }}
            value={users.pageSize}
            onChange={(e) => {
              setUsersDataLimit(Number(e.target.value));
            }}
            size="sm"
            isDisabled={isLoading || users.searchDate ? true : false}
          >
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show 100</option>
            <option value={200}>Show 200</option>
          </Select>

          <Flex gap={4}>
            <Input
              type="text"
              size="sm"
              placeholder="Search Email"
              value={searchUserEmail}
              onChange={(e) => setUserSearchEmail(e.target.value)}
            />
            <Button
              size="sm"
              onClick={() => {
                setUsersEmail(searchUserEmail);
              }}
              fontSize="13"
              rightIcon={<Icon as={CiSearch} fontSize="13" />}
              px={7}
            >
              Search
            </Button>
          </Flex>

          <Button
            size="sm"
            onClick={() => {
              setUsersDataPage(0, usersData?.count, "next");
              setUsersDataLimit(10);
              setUsersEmail("");
              setUserSearchEmail("");
            }}
          >
            All
          </Button>
        </Flex>
        <Flex gap={1} alignItems="center">
          {usersData?.searchDateValuesLength && (
            <Text>
              {usersData?.searchDateValuesLength} of {usersData?.count}
            </Text>
          )}
          <Text color="grey">
            {usersData?.next?.limit &&
              `${users.page}-${usersData?.next?.limit} of
            ${usersData?.count}`}
          </Text>
          <Tooltip label="Previous Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              onClick={() => {
                if (users.page) {
                  setNextPage(users.page, usersData?.count, "prev");
                } else {
                  setNextPage(1, usersData?.count, "prev");
                }
              }}
              isDisabled={
                users.searchEmail ? true : isPrevButtonDisabled(users.page || 1)
              }
              aria-label="Pagination prev"
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Text>{users.page ? users.page : 1}</Text>
          <Tooltip label="Next Page">
            <IconButton
              bg="#fff"
              _hover={{ bg: "#fff" }}
              aria-label="Pagination next"
              onClick={() => {
                if (users.page)
                  setNextPage(users.page, usersData?.count, "next");
                else {
                  setNextPage(1, usersData?.count, "next");
                }
              }}
              isDisabled={
                users.searchEmail
                  ? true
                  : isNextButtonDisabled(
                      users?.page || 1,
                      usersData?.count || 1
                    )
              }
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <form onSubmit={handleEditSubmit}>
            <Box
              bg="#7664BD"
              display="flex"
              justifyContent="space-evenly"
              px={4}
              py={5}
            >
              <Center>
                <Avatar
                  name={editUsers?.name}
                  src={editUsers?.profilePic}
                  boxSize="120px"
                  borderRadius="10px"
                />
              </Center>
              <Box>
                <ModalHeader color="#fff">
                  {editUsers?.name}
                  <Text color="#fff" fontSize="14px" fontWeight={300}>
                    {editUsers?.email}
                  </Text>
                </ModalHeader>

                {/* <ModalCloseButton /> */}
              </Box>
            </Box>
            <ModalBody>
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="verified"
                  mb="0"
                  fontSize="14px"
                >
                  Verified:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="verified"
                  size="sm"
                  isChecked={editUsers?.verified}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        verified: e.target.checked,
                      });
                  }}
                />
              </FormControl>
              {/* Is Admin */}
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="admin"
                  mb="0"
                  fontSize="14px"
                >
                  Admin:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="admin"
                  size="sm"
                  isChecked={editUsers?.isAdmin}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        isAdmin: e.target.checked,
                      });
                  }}
                />
              </FormControl>
              {/* Is Editor */}
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="editor"
                  mb="0"
                  fontSize="14px"
                >
                  Editor:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="editor"
                  size="sm"
                  isChecked={editUsers?.isEditor}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        isEditor: e.target.checked,
                      });
                  }}
                />
              </FormControl>
              {/* Is Intercession */}
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="intercession"
                  mb="0"
                  fontSize="14px"
                >
                  Intercession Admin:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="intercession"
                  size="sm"
                  isChecked={editUsers?.isIntercessionAdmin}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        isIntercessionAdmin: e.target.checked,
                      });
                  }}
                />
              </FormControl>
              {/* Booking Admin */}
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="booking"
                  mb="0"
                  fontSize="14px"
                >
                  Booking Admin:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="booking"
                  size="sm"
                  isChecked={editUsers?.isBookingAdmin}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        isBookingAdmin: e.target.checked,
                      });
                  }}
                />
              </FormControl>
              {/* Is Youtube Link Admin */}
              <FormControl display="flex" alignItems="center" mt={3}>
                <FormLabel
                  color="#5D5C61"
                  htmlFor="youtubeLink"
                  mb="0"
                  fontSize="14px"
                >
                  Youtube Link Admin:
                </FormLabel>
                <Switch
                  colorScheme="green"
                  id="youtubeLink"
                  size="sm"
                  isChecked={editUsers?.isYoutubeLinkAdmin}
                  onChange={(e) => {
                    if (editUsers)
                      setEditUsers({
                        ...editUsers,
                        isYoutubeLinkAdmin: e.target.checked,
                      });
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isDisabled={userAdd.isPending ? true : false}
              >
                {userAdd.isPending ? <Spinner /> : "Update"}
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Card p={2} mt={5} mb={10} height="450px" overflowY="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Profile Picture</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Admin</Th>
              <Th>Editor Admin</Th>
              <Th>Intercession Admin</Th>
              <Th>Booking Admin</Th>
              <Th>YoutubeLink Admin</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersData?.results.map((item) => {
              return (
                <Tr>
                  <Td>
                    <Center>
                      <Avatar
                        size="sm"
                        name={item.name}
                        src={item.profilePic}
                      />
                    </Center>
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    <Badge
                      colorScheme={item.isAdmin ? "green" : "purple"}
                      borderRadius="10px"
                      fontSize="10px"
                    >
                      {item.isAdmin ? "Admin" : "User"}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={item.isEditor ? "green" : "purple"}
                      borderRadius="10px"
                      fontSize="10px"
                    >
                      {item.isEditor ? "Editor" : "User"}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={
                        item.isIntercessionAdmin ? "green" : "purple"
                      }
                      borderRadius="10px"
                      fontSize="10px"
                    >
                      {item.isIntercessionAdmin ? "Intercession Admin" : "User"}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={item.isBookingAdmin ? "green" : "purple"}
                      borderRadius="10px"
                      fontSize="10px"
                    >
                      {item.isBookingAdmin ? "Booking Admin" : "User"}
                    </Badge>
                  </Td>
                  <Td>
                    {" "}
                    <Badge
                      colorScheme={item.isYoutubeLinkAdmin ? "green" : "purple"}
                      borderRadius="10px"
                      fontSize="10px"
                    >
                      {item.isYoutubeLinkAdmin ? "Youtube Admin" : "User"}
                    </Badge>
                  </Td>
                  <Td
                    onClick={() => handleEdit(item)}
                    _hover={{ textDecoration: "underline" }}
                    cursor={
                      currentUser?.email === item.email ? "null" : "pointer"
                    }
                  >
                    <Box
                      borderRadius="50%"
                      bg={
                        currentUser?.email === item.email ? "#ccc" : "#518CED"
                      }
                      p={2}
                      _hover={{ bg: "#ccc" }}
                    >
                      <Center>
                        <Icon
                          as={MdEdit}
                          isDisabled={
                            currentUser?.email === item.email ? true : false
                          }
                          fontSize="15"
                          color="#fff"
                        />
                      </Center>
                    </Box>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
    </>
  );
};

export default UsersDashboard;
