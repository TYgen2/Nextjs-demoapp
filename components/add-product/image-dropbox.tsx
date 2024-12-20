import { Button } from "../ui/button";

type ImageDropBoxProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | undefined;
  previewUrl: string | undefined;
};

const ImageDropbox = ({
  inputRef,
  handleChange,
  file,
  previewUrl,
}: ImageDropBoxProps) => {
  return (
    <div className="flex w-[600px] flex-col items-center justify-center rounded-3xl shadow-2xl shadow-green-300">
      {/* Hidden select input button */}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png, image/webp"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

      {!file && !previewUrl && (
        <Button
          className="select-none bg-transparent p-40 text-center text-3xl font-bold text-gray-300 shadow-none hover:bg-transparent"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Click to select a file
          <br />
          or drag and drop
        </Button>
      )}
    </div>
  );
};

export default ImageDropbox;
