import { useRef, useState } from "react";
import { useMessageStore } from "../store/messageStore"
import { Image, SendIcon, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const { sendMessages } = useMessageStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) {
      return;
    }

    try {
      await sendMessages({
        text: text.trim(),
        image: image ? image : null,
      })

      setText("");
      setImage(null);
      if (inputRef.current) {
        inputRef.current.value = null;
      }

    } catch (error) {
      console.log(error)
      toast.error("Failed to send message");
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
  }

  const handleRemoveImage = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  }

  return (
    <div className="p-3 border-t">
      {image && (
          <div className="flex items-center justify-between mb-2">
            <div className="relative">
              <img
              src={image}
              alt="Selected"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-white rounded-full p-1 text-red-500 hover:bg-gray-200"
            >
              <X size={15} />
            </button>
            </div>
          </div>
        )}
      <div className="flex items-center">
        
        <form onSubmit={handleSubmit} className="flex items-center w-full">
          <button 
            type="button"
            onClick={() => inputRef.current.click()}
            className="text-gray-500 mx-2"
          >
            <Image />
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={inputRef}
          />
          <input 
            type="text" 
            placeholder="Message..." 
            className="flex-1 bg-gray-100 rounded-full py-2 px-4 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)} 
          />
          <button className="ml-2 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
            type="submit"
            disabled={!text.trim() && !image} 
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageInput