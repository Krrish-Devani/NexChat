import { useState } from "react";
import { useAuthStore } from "../store/userAuthStore"

function Profile() {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [ selectedImage, setSelectedImage ] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64Image = e.target.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="m-10 max-w-sm w-full">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div className="relative mx-auto w-36 rounded-full">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                className="size-32 rounded-full object-cover"
                src={selectedImage || authUser?.profilePic || 'avatar.png'}
                alt="Profile"
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </div>
          <p className="mt-2 text-center text-sm text-gray-500">
              { isUpdatingProfile ? (
                <span className="animate-pulse text-blue-500">Updating profile...</span>
              ) : (
                <span>Click on the image to change your profile picture</span>
              )}
          </p>
          <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{authUser?.fullName}</h1>
          <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{authUser?.email}</h3>
          
          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>Status</span>
              <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">Active</span></span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>Joined On</span>
              <span className="ml-auto">{authUser.createdAt?.split("T")[0]}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile


