'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

const ShowToast = ({
  message,
  type = 'success',
  description,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const options = {
        description,
        position: "top-center",
        style: {
          background: "#F0FDF4",
          border: "1px solid #22C55E",
          color: "#166534",
        },
      };

      switch (type) {
        case 'success':
          toast.success(message, options);
          break;

        case 'error':
          toast.error(message, {
            ...options,
            style: {
              background: "#FEF2F2",
              border: "1px solid #EF4444",
              color: "#991B1B",
            },
          });
          break;

        case 'warning':
          toast.warning(message, {
            ...options,
            style: {
              background: "#FFFBEB",
              border: "1px solid #F59E0B",
              color: "#92400E",
            },
          });
          break;

        case 'info':
          toast.info(message, {
            ...options,
            style: {
              background: "#EFF6FF",
              border: "1px solid #3B82F6",
              color: "#1E40AF",
            },
          });
          break;

        default:
          toast(message, options);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [message, type, description]);

  return null;
};

export default ShowToast;