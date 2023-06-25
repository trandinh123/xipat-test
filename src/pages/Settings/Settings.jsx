import React, { useState } from "react";
import {
  Page,
  FormLayout,
  Layout,
  TextField,
  Box,
  Button,
} from "@shopify/polaris";
import DatePickerField from "../../components/DatePickerField/DatePickerField";
import ColorPickerField from "../../components/ColorPickerField/ColorPickerField";

export default function Settings() {
  const [err, setErr] = useState({
    hasErr: false,
    position: "",
  });
  const [settings, setSettings] = useState({
    title: "",
    email: "",
    backgroundColor: "#000",
    activeDate: {
      start: new Date(),
      end: new Date(),
    },
  });
  const [visibleSave, setVisibleSave] = useState(false);
  const handleInputChange = ({ field, value }) => {
    setVisibleSave(true);
    setErr({});
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSaveSettings = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (settings.title.trim().length === 0) {
      return setErr({
        hasErr: true,
        position: "title",
        message: "Empty title",
      });
    }
    if (!emailPattern.test(settings.email)) {
      return setErr({
        hasErr: true,
        position: "email",
        message: "Invalid email",
      });
    }
    if (!hexColorPattern.test(settings.backgroundColor)) {
      return setErr({
        hasErr: true,
        position: "backgroundColor",
        message: "Invalid background color",
      });
    }
    console.log("Save successfully", settings);
  };

  return (
    <Page
      fullWidth
      title="Settings"
      primaryAction={
        visibleSave ? (
          <Button primary onClick={handleSaveSettings}>
            Save
          </Button>
        ) : (
          <></>
        )
      }
    >
      <FormLayout>
        <Layout>
          <Layout.Section>
            <FormLayout>
              <FormLayout.Group>
                <Box maxWidth="350px">
                  <TextField
                    label="Title"
                    value={settings.title}
                    onChange={(value) =>
                      handleInputChange({ field: "title", value })
                    }
                    error={
                      err.hasErr && err.position === "title" ? err.message : ""
                    }
                  />
                </Box>
                <Box maxWidth="350px">
                  <TextField
                    label="Email"
                    value={settings.email}
                    onChange={(value) =>
                      handleInputChange({ field: "email", value })
                    }
                    error={
                      err.hasErr && err.position === "email" ? err.message : ""
                    }
                  />
                </Box>
              </FormLayout.Group>
              <FormLayout.Group>
                <ColorPickerField
                  err={err}
                  value={settings.backgroundColor}
                  onChange={(value) =>
                    handleInputChange({ field: "backgroundColor", value })
                  }
                />
                <DatePickerField
                  value={settings.activeDate}
                  onChange={(value) =>
                    handleInputChange({ field: "activeDate", value })
                  }
                />
              </FormLayout.Group>
            </FormLayout>
          </Layout.Section>
        </Layout>
      </FormLayout>
    </Page>
  );
}
