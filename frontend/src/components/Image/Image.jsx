import { IKImage } from "imagekitio-react";

const Image = ({ path, src, alt, className, w, h }) => {
  return (
    <IKImage
      className={className}
      urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINTS}
      src={src}
      path={path}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      transformation={[
        {
          height: h,
          width: w,
        },
      ]}
    />
  );
};

export default Image;
