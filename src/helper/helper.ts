import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const truncateText = (data: any, limit: any) => {
    let text = data;
    if (text) {
      text = text.toString();
      text = text.trim();
      if (text.length > limit) text = text.substring(0, limit) + "...";
    }
  
    return text;
  };

  export const formatTime = (seconds:any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };  

  export const showAlert = (text:any) => {
    toast.info(text, {
      position: toast.POSITION.TOP_RIGHT,
  });
  }

  export const uploadFileToCloudnariy = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "f2evczgh");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/deittai74/upload",
        {
          method: "POST",
          body: formData,
        }
      );
            
      if (response.ok) {
        const res = await response.json();
        return res.url;
      } else {
        console.error("Image upload failed. ", JSON.stringify(response));
        return;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return;
    }
  };
  