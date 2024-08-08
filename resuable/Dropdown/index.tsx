import React from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface DropdownComponentProps {
  dropdownOpen?: boolean[];
  index: number;
  data: any;
  handleImageClick?: (index: number) => void;
  
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  dropdownOpen,
  index,
  handleImageClick,
  
  data,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = async (file:any) => {
    const extension=file.split(".").pop();
    await fetch(`http://localhost:4000/${file}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = Date.now() + "." + extension;

        document.body.appendChild(link);

        link.click();
        if (link.parentNode !== null) {
          link.parentNode.removeChild(link);
        }
      });
  };

  return (
    <>
      <IconButton
        aria-controls={`dropdown-basic-${index}`}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`dropdown-basic-${index}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleDownload(data?.currentFile ? data?.currentFile : data?.file)}>
          Download
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownComponent;
