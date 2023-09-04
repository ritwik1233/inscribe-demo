import {
  Grid,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getParentLineItem } from "inscribe-js";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const AnchorLink = (props) => {
  const { anchorEl, setAnchorEl, onModifyItem } = props;
  const [value, setValue] = useState("");
  React.useEffect(() => {
    if (anchorEl) {
      const url = anchorEl.getAttribute("data-url");
      setValue(url || "");
    }
  }, [anchorEl]);
  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        disableRestoreFocus
        sx={{
          minWidth: "100px",
          minHeight: "100px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAnchorEl(null);
          setValue("");
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            margin: "3px",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="caption">Add Link</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onBlur={() => {
                if (value.length > 0) {
                  const parentItem = getParentLineItem(anchorEl);
                  anchorEl?.setAttribute("data-url", value);
                  const parentId = parentItem?.id;
                  const elemId = parentId?.split("-")[1];
                  const newValue = parentItem.innerHTML;
                  const item = {
                    _id: elemId,
                    value: newValue,
                  };
                  onModifyItem(item);
                }
              }}
            />
          </Grid>
          <Grid item xs={3}>
            {value.length > 0 && (
              <Tooltip title="Open link in new tab">
                <IconButton
                  size="small"
                  onClick={() => {
                    const url = anchorEl.getAttribute("data-url");
                    if (url) {
                      window.open(url, "_blank");
                    }
                  }}
                >
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} />
        </Grid>
      </Popover>
    </>
  );
};

export default AnchorLink;
