import { useState } from 'react';
import RiskPercent from "./Risk-percent"

export default function Dropdown() {

  const [selectedValue, setSelectedValue] = useState('');

  function handleDropdownChange(event) {
    setSelectedValue(event.target.value);
  }

  const imageMap = {
    option1: "https://bafybeifk3nmzagmuzdp7xqallxiafh3n4rax6grgymids4ognfdc3kiem4.ipfs.w3s.link/aave.jpg",
    option2: 'https://bafybeihyxxqczfor6i3euipvslilojf5u3xqb64q65bbrilzuclwby7yea.ipfs.w3s.link/compound.png',
    option3: "https://bafybeif4somoa5pp4rxj6rcpq2f72wgctc525fma7iip7pw2g3pngjoqfi.ipfs.w3s.link/uni.jpeg",
  };

    return (
        <div className="dropdown">
            <RiskPercent />

          <label className="dropdown-label" htmlFor="dropdown-el">Lending Protocol</label> 
          <select value={selectedValue} onChange={handleDropdownChange} id="dropdown-name"> 
            <option id='image-el' value="">Select an option</option>
            <option id='image-el' value="option1">Aave</option> 
            <option id='image-el' value="option2">Compound</option> 
            <option id='image-el' value="option3">Uniswap</option> 
          </select>

          <div className='image-render'>
            {selectedValue && (
              <img className='protocol-image' src={imageMap[selectedValue]} alt="Selected Option" />
          )}
          </div>
        </div>
    )
}