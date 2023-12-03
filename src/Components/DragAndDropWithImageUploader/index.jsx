import React, { useState, useRef, useEffect } from "react";

import { useDropzone } from "react-dropzone";

const DropZone = ({ handleModalShow }) => {
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRetakeMode, setIsRetakeMode] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const { getRootProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setConvertedImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });
  const handleImageSearch = () => {
    console.log('Search clicked with file:', convertedImage);
  };
  const handlePhotoSearch = () => {
    console.log('searched');
  }
  const handleCameraStart = async () => {
    setIsCameraOpen(true);
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(cameraStream);
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
        videoRef.current.play();
      }
    } catch (error) {
      setIsCameraOpen(false);
      console.log("Error accessing camera:", error);
    }
  };
  const handleCameraStop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };
  const handleCancel = () => {
    handleCameraStop();
    setIsCameraOpen(false);
    handleModalShow();
  };

  const handleCameraCapture = async () => {
    const captureCanvas = document.createElement("canvas");
    const captureContext = captureCanvas.getContext("2d");
    captureCanvas.width = videoRef.current.videoWidth;
    captureCanvas.height = videoRef.current.videoHeight;
    captureContext.drawImage(videoRef.current, 0, 0);

    const imageDataUrl = await captureCanvas.toDataURL("image/png");
    setCapturedImageUrl(imageDataUrl);
    setIsRetakeMode(true);
    // Pause the video
    videoRef.current.pause();

    // Stop the video stream after a delay to allow for proper pausing
    setTimeout(() => {
      handleCameraStop();
    }, 200);
  };

  const handleRetake = () => {
    // Clear the captured image URL and retake mode
    setCapturedImageUrl(null);
    setIsRetakeMode(false);

    // Start the camera again
    handleCameraStart();
  };

  // Stop the camera when the component is unmounted
  useEffect(() => {
    return () => {
      handleCameraStop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-h-[60vh] gap-4">
      {!isCameraOpen ? (
        <div
          className={`mb-4 ${isDragActive ? "border-green-600" : "border-gray-300"
            }`}
        >
          <label
            {...getRootProps()}
            htmlFor="image-upload"
            className={`cursor-pointer block w-full p-4 border border-dashed rounded-md text-center ${isDragActive ? "bg-green-100" : "bg-white"
              }`}
          >
            <p className={`text-${isDragActive ? "green-500" : "gray-600"}`}>
              {isDragActive
                ? "Drop the image here"
                : "Drag 'n' drop an image here, or click to select one"}
            </p>
          </label>
          {convertedImage && <img
            src={convertedImage}
            alt="Uploaded"
            className="max-w-full h-auto"
          />}
        </div>
      ) : (
        <>
          {capturedImageUrl ? (
            <img
              src={capturedImageUrl}
              alt="Captured"
              className="max-w-full h-auto"
            />
          ) : (
            <video
              ref={videoRef}
              className="max-w-full h-auto"
              style={{ display: "block", cursor: "pointer" }}
              onClick={() => videoRef.current.play()}
            />
          )}
        </>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={
            isCameraOpen
              ? stream && !isRetakeMode
                ? handleCameraCapture
                : handleRetake
              : handleCameraStart
          }
          className={`bg-blue-500 text-white rounded-md px-3 py-2 hover:bg-blue-600`}
        >
          {isCameraOpen
            ? stream && !isRetakeMode
              ? "Capture"
              : "Retake"
            : "Open Camera"}
        </button>

        <button
          onClick={capturedImageUrl ? handlePhotoSearch : handleImageSearch}
          className="bg-green-600 text-white rounded-md px-4 py-2"
        >
          Search
        </button>

        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DropZone;
