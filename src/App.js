import { Editor } from "inscribe-js";
import "./App.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Image from "./Image";
import React, { useState } from "react";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AnchorLink from "./AnchorLink";
import VideoComponent from "./VideoComponent";
import { Container, Grid, Typography } from "@mui/material";
function App() {
  const [lines, setLines] = useState([
    {
      _id: "line1",
      order: 0,
      type: "text",
      value: "This is the first line",
    },
    {
      _id: "line2",
      order: 1,
      type: "text",
      value: "This is the second line",
    },
    {
      _id: "line3",
      order: 2,
      type: "text",
      value:
        'This is the third line with <span class="red-text">red text</span>',
    },
    {
      _id: "line4",
      order: 3,
      type: "text",
      value: `This is the fourth line with <span class="blue-text">blue text</span>`,
    },
    {
      _id: "line5",
      order: 4,
      type: "text",
      value:
        'This is the fifth line with a <span class="click-handler" data-clickhandlerid="clickhandler1" data-url="https://www.npmjs.com/package/inscribe-js"> link </span>',
    },
    {
      _id: "line6",
      order: 5,
      type: "Video",
      videoUrl: "https://www.youtube.com/watch?v=7PIji8OubXU",
      width: 500,
      height: 300,
    },
    {
      _id: "line7",
      order: 6,
      type: "text",
      value: `This is the sixth line`,
    },
    {
      _id: "line8",
      order: 7,
      type: "Image",
      imageUrl:
        "https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fHww&w=1000&q=80",
      width: 500,
      height: 300,
    },
    {
      _id: "line9",
      order: 8,
      type: "text",
      value: `This is the eighth line.`,
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const textFormats = [
    {
      className: "blue-text",
      label: "Blue",
      tooltip: "Turn text blue",
    },
    {
      className: "red-text",
      label: "Red",
      tooltip: "Turn text red",
    },
    {
      className: "click-handler",
      label: <InsertLinkIcon />,
      tooltip: "Add link",
      onClickHandlerObj: {
        clickHandlerId: "clickhandler1",
        onClickHandlerFunc: function (e) {
          setAnchorEl(e.target);
        },
      },
    },
  ];

  const components = [
    {
      label: "Insert Image",
      type: "Image",
      elemProps: {
        imageUrl: "",
        width: 500,
        height: 300,
      },
      icon: <PhotoSizeSelectActualIcon />,
      elemHandlers: [
        {
          triggerModifyLine: true,
          funcPropName: "onChange",
          funCall: (value) => {
            return [
              {
                key: "imageUrl",
                value,
              },
            ];
          },
        },
        {
          triggerModifyLine: true,
          funcPropName: "onChangeResize",
          funCall: (width, height) => {
            return [
              {
                key: "width",
                value: width,
              },
              {
                key: "height",
                value: height,
              },
            ];
          },
        },
      ],
      onModifyItem: (line) => {
        setLines((prev) => {
          const newLines = [...prev];
          newLines[line.order] = line;
          return [...newLines];
        });
      },
      component: Image,
    },
    {
      label: "Insert Video",
      type: "Video",
      elemProps: {
        videoUrl: "",
        width: 500,
        height: 300,
      },
      icon: <VideoLibraryIcon />,
      elemHandlers: [
        {
          triggerModifyLine: true,
          funcPropName: "onChange",
          funCall: (value) => {
            return [
              {
                key: "videoUrl",
                value,
              },
            ];
          },
        },
        {
          triggerModifyLine: true,
          funcPropName: "onChangeResize",
          funCall: (width, height) => {
            return [
              {
                key: "width",
                value: width,
              },
              {
                key: "height",
                value: height,
              },
            ];
          },
        },
      ],
      onModifyItem: (line) => {
        setLines((prev) => {
          const newLines = [...prev];
          newLines[line.order] = line;
          return [...newLines];
        });
      },
      component: VideoComponent,
    },
  ];

  return (
    <>
      <AnchorLink
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onModifyItem={(newLine) => {
          setLines((prev) => {
            let newLines = [...prev];
            newLines = newLines.map((line) => {
              if (line._id === newLine._id) {
                return {
                  ...line,
                  value: newLine.value,
                };
              }
              return line;
            });
            return [...newLines];
          });
        }}
      />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <Typography
              variant="h4"
              textAlign="center"
              className="no-select"
              sx={{
                color: "white",
              }}
            >
              InscribeJS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              textAlign="center"
              className="no-select"
              sx={{
                color: "white",
              }}
            >
              A rich text editor for React. Build your own custom editor
              using&nbsp;
              <a
                href="https://www.npmjs.com/package/inscribe-js"
                target="_blank"
              >
                InscribeJS
              </a>
              .{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              textAlign="center"
              className="no-select"
              sx={{
                color: "white",
              }}
            >
              View{" "}
              <a
                href="https://github.com/ritwik1233/inscribe-demo"
                target="_blank"
              >
                full code example
              </a>{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid #ccc",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              height: "auto",
            }}
          >
            <Editor
              lines={lines}
              setLines={setLines}
              textFormats={textFormats}
              components={components}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
