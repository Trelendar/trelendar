import { useState } from 'react';

const CopyLink = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Copy Link Invite</h2>
      <button className='text-[#0c66e4]' onClick={handleCopyLink}>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</button>
    </div>
  );
};
export default CopyLink;
