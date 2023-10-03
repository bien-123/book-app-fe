import cx from "classnames";

export type ImageProps = {
  src?: string;
  placeholder?: string;
} & React.ComponentProps<"img">;

const CustomImage = ({ src, className, ...props }: ImageProps) => {
  return (
    <img
      src={src}
      alt="Preview"
      {...props}
      className={cx("rounded-lg inline-block object-cover", className)}
    />
  );
};

export default CustomImage;