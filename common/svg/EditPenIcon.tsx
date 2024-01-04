import React from 'react'

interface SvgIconProps {
  className?: string
}

const EditPenIcon: React.FC<SvgIconProps> = ({ className = '' }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fontSize="inherit"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5137 0.805856C11.5869 -0.268899 13.3274 -0.269557 14.4013 0.804385L16.8932 3.29624C17.958 4.36102 17.969 6.08478 16.918 7.16315L7.68486 16.6364C6.97933 17.3603 6.01167 17.7685 5.00124 17.7684L2.24909 17.7683C0.969844 17.7682 -0.0517699 16.7019 0.00203171 15.4228L0.120186 12.6138C0.159684 11.6747 0.549963 10.7847 1.2138 10.1199L10.5137 0.805856ZM13.3415 1.86585C12.8533 1.37769 12.0622 1.37799 11.5744 1.86652L9.9113 3.53212L14.1911 7.81191L15.8446 6.11539C16.3224 5.62522 16.3173 4.84169 15.8333 4.3577L13.3415 1.86585ZM2.27446 11.1805L8.85145 4.59358L13.144 8.88618L6.61148 15.5886C6.18816 16.023 5.60756 16.2679 5.0013 16.2679L2.24916 16.2677C1.82274 16.2677 1.4822 15.9123 1.50014 15.4859L1.61829 12.6769C1.64199 12.1134 1.87616 11.5794 2.27446 11.1805ZM17.5148 17.6951C17.9289 17.6951 18.2645 17.3592 18.2645 16.9448C18.2645 16.5305 17.9289 16.1945 17.5148 16.1945H11.3931C10.9791 16.1945 10.6434 16.5305 10.6434 16.9448C10.6434 17.3592 10.9791 17.6951 11.3931 17.6951H17.5148Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default EditPenIcon
