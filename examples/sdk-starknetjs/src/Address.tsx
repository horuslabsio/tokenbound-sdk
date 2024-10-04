import React from 'react';

interface FormatAddressProps {
  address: string | undefined;
}

const FormatAddress: React.FC<FormatAddressProps> = ({ address }) => {
  const shortenAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(address ?? "");
    alert('Address copied to clipboard!');
  };

  return (
    <div className='flex items-center gap-2'>
      <span className='text-lg font-bold'> {shortenAddress(address ?? "")}</span>
      <button className='bg-blue-400 text-xs py-2 text-white rounded-sm px-3' onClick={copyToClipboard} style={{ marginLeft: '10px' }}>
        Copy
      </button>
    </div>
  );
};

export default FormatAddress;