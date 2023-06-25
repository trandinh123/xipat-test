import React, { useEffect } from "react";
import {
  Page,
  FormLayout,
  Layout,
  Button,
  LegacyStack,
  TextField,
} from "@shopify/polaris";
import { DataTable, Modal, Text, Pagination } from "@shopify/polaris";
import { useState } from "react";
import { ViewMajor } from "@shopify/polaris-icons";
import "./PostManagement.css";
export default function PostManagement() {
  const [usersData, setUsersData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [page, setPage] = useState(0);
  const [initData, setInitData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const NUMBER_USERS_PER_PAGE = 10;
  const totalPages = initData.length / NUMBER_USERS_PER_PAGE;

  const getUsersData = async () => {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await resp.json();
      setInitData(data);
      setUsersData(data.slice(0, NUMBER_USERS_PER_PAGE));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);
  const prepareUserRows = (data) => {
    return data.map((item) => {
      return [
        item.id,
        item.userId,
        item.title,
        <Button
          icon={ViewMajor}
          onClick={() => {
            setSelectedUserData(item);
            handleOpenViewModal();
          }}
        ></Button>,
      ];
    });
  };
  const [openViewModal, setOpenViewModal] = useState(false);
  const handleOpenViewModal = () => setOpenViewModal(!openViewModal);
  return (
    <Page fullWidth title="Users Management">
      <FormLayout>
        <Layout>
          <Layout.Section>
            <LegacyStack distribution="equalSpacing">
              <Pagination
                label={page + 1}
                hasPrevious={page}
                onPrevious={() => {
                  if (page > 0) {
                    setUsersData((prev) =>
                      initData.slice(
                        (page - 1) * NUMBER_USERS_PER_PAGE,
                        page * NUMBER_USERS_PER_PAGE
                      )
                    );
                    setPage((prev) => prev - 1);
                  }
                }}
                hasNext={page < totalPages}
                onNext={() => {
                  if (page < totalPages) {
                    setUsersData((prev) =>
                      initData.slice(
                        page * NUMBER_USERS_PER_PAGE,
                        (page + 1) * NUMBER_USERS_PER_PAGE
                      )
                    );
                    setPage((prev) => prev + 1);
                  }
                }}
              />
              <TextField
                placeholder="Filter By ID or Title"
                value={filterValue}
                onChange={(val) => {
                  setFilterValue(val);
                  if (val !== "") {
                    return setUsersData(
                      initData.filter(
                        (user) =>
                          user.userId.toString().includes(val) ||
                          user.title.includes(val)
                      )
                    );
                  }
                  setUsersData(initData);
                }}
              />
            </LegacyStack>
          </Layout.Section>
          <Layout.Section>
            <DataTable
              columnContentTypes={["numeric", "numeric", "text", "text"]}
              headings={["ID", "User ID", "Title", "Actions"]}
              rows={prepareUserRows(usersData)}
            />
            <Modal
              open={openViewModal}
              onClose={handleOpenViewModal}
              title="Selected User"
            >
              <Modal.Section>
                <FormLayout>
                  <Text fontWeight="medium">
                    Id:{" "}
                    <Text as="span" fontWeight="regular">
                      {selectedUserData.id}
                    </Text>
                  </Text>
                  <Text fontWeight="medium">
                    User Id:{" "}
                    <Text as="span" fontWeight="regular">
                      {selectedUserData.userId}
                    </Text>
                  </Text>
                  <Text fontWeight="medium">
                    Title:{" "}
                    <Text as="span" fontWeight="regular">
                      {selectedUserData.title}
                    </Text>
                  </Text>
                  <Text fontWeight="medium">
                    Body:{" "}
                    <Text as="span" fontWeight="regular">
                      {selectedUserData.body}
                    </Text>
                  </Text>
                </FormLayout>
              </Modal.Section>
            </Modal>
          </Layout.Section>
        </Layout>
      </FormLayout>
    </Page>
  );
}
