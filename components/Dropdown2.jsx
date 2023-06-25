import { useState } from 'react';

export default function Dropdown2() {
  const [selectedValue, setSelectedValue] = useState('');

  function handleDropdownChange(event) {
    setSelectedValue(event.target.value);
  }

  const imageMap = {
    option1: "https://cloudflare-ipfs.com/ipfs/bafybeicn7i3soqdgr7dwnrwytgq4zxy7a5jpkizrvhm5mv6bgjd32wm3q4/welcome-to-IPFS.jpg",
    option2: 'https://bafybeicir2m3ut2bsp4zc5phopxa47elw35lpnuuuemohayspnwul5hpoy.ipfs.w3s.link/0cd3948b1b387cdfa08e896d613c7598.svg',
    option3: "https://bafybeif4somoa5pp4rxj6rcpq2f72wgctc525fma7iip7pw2g3pngjoqfi.ipfs.w3s.link/uni.jpeg",
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleDropdownChange}>
        <option id='image-el' value="">Select an option</option>
        <option id='image-el' value="option1">Aave</option>
        <option id='image-el' value="option2">Compound</option>
        <option id='image-el' value="option3">Uniswap</option>
      </select>

      {selectedValue && (
        <img src={imageMap[selectedValue]} alt="Selected Option" />
      )}
    </div>
  );
}
