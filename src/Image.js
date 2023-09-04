import React from "react";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Box, Tooltip } from "@mui/material";

function fileToDataURL(file, callback) {
  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      callback(event.target.result);
    };

    reader.readAsDataURL(file);
  } else {
    callback("");
  }
}
const Image = (props) => {
  const { imageUrl = "", width, height, onChange, onChangeResize } = props;
  const [currentWidth, setCurrentWidth] = React.useState(width);
  const [currentHeight, setCurrentHeight] = React.useState(height);
  const onResizeEnd = (e, data) => {
    const { size } = data;
    onChangeResize(size.width, size.height);
  };
  return (
    <React.Fragment>
      {imageUrl.length === 0 && (
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files || [];
            const file = files[0] || {};
            fileToDataURL(file, (dataURL) => {
              onChange(dataURL);
            });
          }}
        />
      )}
      {imageUrl.length > 0 && (
        <Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <ResizableBox
              width={width}
              height={height}
              lockAspectRatio
              handle={
                <div
                  style={{
                    cursor: "se-resize",
                    position: "absolute",
                    left: currentWidth - 10,
                    top: currentHeight - 10,
                  }}
                >
                  <Tooltip placement="right" title="resize">
                    <AspectRatioIcon />
                  </Tooltip>
                </div>
              }
              onResize={(e, data) => {
                const { size } = data;
                setCurrentWidth(size.width);
                setCurrentHeight(size.height);
              }}
              onResizeStop={onResizeEnd}
              minConstraints={[100, 100]}
              maxConstraints={[500, 600]}
            >
              <img
                src={imageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                draggable="false"
              />
            </ResizableBox>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Image;
