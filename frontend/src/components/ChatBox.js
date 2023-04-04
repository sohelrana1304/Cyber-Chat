// import { useState } from "react";
import {
  Box,
  /*  Button,
  Stack,
  Text,
  useDisclosure,
  useToast, */
} from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
import { ChatState } from "./Context/ChatProvider";
// import GroupChatModal from "./miscellaneous/GourpChatModal";
// import ChatLoading from "./ChatLoading";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [groupChatName, setGroupChatName] = useState();
  // const [selectedUsers, setSelectedUsers] = useState([]);
  // const [search, setSearch] = useState("");
  // const [searchResult, setSearchResult] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const toast = useToast();

  const { selectedChat /* setSelectedChat, user, chats, setChats */ } =
    ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};
export default ChatBox;
