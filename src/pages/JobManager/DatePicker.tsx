import * as React from "react"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import InfoIcon from "@mui/icons-material/Info"

export default function BasicDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null)

  return (
    <Box>
      <Typography variant="caption">
        Scenario Date <InfoIcon fontSize="small" />
      </Typography>
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="mmm/dd"
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  )
}
