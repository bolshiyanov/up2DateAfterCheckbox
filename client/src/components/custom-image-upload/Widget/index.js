import { useState } from "react";
import UploadWidget from "./UploadWidget";
import { Button, Image, Space } from "antd";

function Widget({ onUrlChange }) {
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    const imageUrl = result?.info?.secure_url;
    updateUrl(imageUrl);
    onUrlChange(imageUrl); // Notify the parent component about the URL change
  }

  return (
    <>
      <UploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Space size={12} style={{ marginBottom: 32, marginTop: 8 }}>
              {url && (
                <Image
                  width={200}
                  src={url}
                  placeholder={<Image preview={false} src={url} width={200} />}
                />
              )}
              <Button
                style={{ marginLeft: url ? 16 : 0 }}
                type="primary"
                onClick={handleOnClick}
              >
                Reload Image
              </Button>
            </Space>
          );
        }}
      </UploadWidget>

      {error && <p>{error}</p>}
    </>
  );
}

export default Widget;
