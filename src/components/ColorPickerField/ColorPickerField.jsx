import React, { useState, useRef } from "react";
import {
  TextField,
  ColorPicker,
  FormLayout,
  Box,
  HorizontalStack,
} from "@shopify/polaris";
import "./ColorPickerField.css";
import { hexToHsv, hsvToHex } from "../../helpers/colorConverter";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function ColorPickerField({
  value = {},
  err = {},
  onChange = () => {},
  label = "Background Color",
}) {
  const [focus, setFocus] = useState(false);
  const colorPickerRef = useRef(null);
  useOnClickOutside(colorPickerRef, () => setFocus(false));

  return (
    <div ref={colorPickerRef}>
      <Box>
        <FormLayout>
          <HorizontalStack blockAlign={err.hasErr ? "center" : "end"} wrap>
            <Box width="314px">
              <TextField
                label={label}
                value={value}
                onChange={onChange}
                onFocus={() => setFocus(true)}
                error={
                  err.hasErr && err.position === "backgroundColor"
                    ? err.message
                    : ""
                }
              />
            </Box>
            <div
              className="ColorPickerField__PreviewColor"
              style={{ backgroundColor: value }}
              onClick={() => setFocus(!focus)}
            ></div>
          </HorizontalStack>
          {focus && (
            <ColorPicker
              onChange={(value) =>
                onChange(
                  hsvToHex({
                    h: value.hue,
                    v: value.brightness,
                    s: value.saturation,
                  })
                )
              }
              color={hexToHsv(value)}
            />
          )}
        </FormLayout>
      </Box>
    </div>
  );
}
