import React from "react";
import { Box, Card, CardContent, Grid, TextField, Tooltip } from "@mui/material";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ReactPlayer from "react-player";

const VideoComponent = (props) => {
  const { videoUrl, width, height, onChange, onChangeResize } = props;
  const [url, setUrl] = React.useState("");
  const [currentWidth, setCurrentWidth] = React.useState(width);
  const [currentHeight, setCurrentHeight] = React.useState(height);
  const onResizeEnd = (e, data) => {
    const { size } = data;
    onChangeResize(size.width, size.height);
  };

  return (
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
          minConstraints={[200, 100]}
          maxConstraints={[1000, 800]}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              padding: "0px",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                padding: "0px",
              }}
            >
              <Grid container spacing={0}>
                {videoUrl.length === 0 && (
                  <Grid item xs={12}>
                    <TextField
                      label="add youtube url"
                      value={url}
                      fullWidth
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      onBlur={() => {
                        onChange(url);
                      }}
                    />
                  </Grid>
                )}
                {videoUrl.length > 0 && (
                  <Grid item xs={12}>
                    <ReactPlayer width={width} height={height} url={videoUrl} />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </ResizableBox>
      </Box>
    </Box>
  );
};

export default VideoComponent;
