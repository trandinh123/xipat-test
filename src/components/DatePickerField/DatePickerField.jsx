import { DatePicker, FormLayout, Box, TextField } from "@shopify/polaris";
import { useState, useCallback, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function DatePickerField({
  value = {},
  onChange = () => {},
  label = "Active Date",
}) {
  const [{ month, year }, setDate] = useState({
    month: value.start.getMonth(),
    year: value.start.getFullYear(),
  });
  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );
  const [focus, setFocus] = useState(false);
  const datePickerRef = useRef(null);
  useOnClickOutside(datePickerRef, () => setFocus(false));

  return (
    <div ref={datePickerRef}>
      <Box width="350px">
        <FormLayout>
          <TextField
            label={label}
            value={`${value.start.toDateString()} - ${value.end.toDateString()}`}
            onChange={onChange}
            onFocus={setFocus}
          />
          {focus && (
            <DatePicker
              month={month}
              year={year}
              onChange={onChange}
              onMonthChange={handleMonthChange}
              selected={value}
              allowRange
            />
          )}
        </FormLayout>
      </Box>
    </div>
  );
}
