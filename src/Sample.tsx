import React, { useState } from "react";

/**
 * ドロップダウンで表示する選択肢データの例。
 * ここではラベルとアイコン（例としてSVGや画像URL）を用意しています。
 */
const dropdownItems = [
  {
    label: "AAAAAA",
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    label: "BBBBBBB",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/NipponLifeLogo.svg/120px-NipponLifeLogo.svg.png"
        alt="nissay logo"
        className="w-5 h-5"
      />
    ),
  },
  {
    label: "CCCCCCCC",
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    label: "DDDDD",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/NipponLifeLogo.svg/120px-NipponLifeLogo.svg.png"
        alt="nissay logo"
        className="w-5 h-5"
      />
    ),
  },
];

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropdownItems[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-56 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          {selectedItem.icon}
          <span>{selectedItem.label}</span>
        </div>
        {/* ▼アイコン部分 */}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ドロップダウンメニュー本体 */}
      {isOpen && (
        <div className="absolute z-10 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(item)}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
