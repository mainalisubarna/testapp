import React, { useState } from 'react';
import DropZone from '../DragAndDropWithImageUploader/index';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  };


  const handleModalShow = () => {
    setShowImageModal(false);
  }
  const handleImageSearchModalOpen = () => {
    setShowImageModal(true);
    // Implement logic to show image upload modal
  };


  return (
    <div className="flex items-center justify-between mt-[28vh] rounded-[1rem] lg:mx-[14vw] md:mx-[4vw] sm:mx-[2vw] mx-[1vw] gap-1 p-2.5 pl-5 bg-white">

      {/* Main Search Box */}
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full border-none bg-white p-2 text-gray-800 placeholder-gray-600 focus:outline-none"
        />
      </div>
      {/* Search Option */}

      <div className="mr-2">
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>
      {/* Search by Image Option */}
      <div className="ml-0">
        <button
          onClick={handleImageSearchModalOpen}
          className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
        >
          Search by Image
        </button>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 max-w-md rounded-md">
            <label htmlFor="image-upload" className="cursor-pointer block mb-2">
              Upload Image
            </label>
            <DropZone handleModalShow={handleModalShow} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
