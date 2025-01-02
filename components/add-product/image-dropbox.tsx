import { Button } from "../ui/button";
import { toast } from "sonner";

type ImageDropBoxProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  file: File | undefined;
  previewUrl: string | undefined;
};

const MAX_DIMENSION = 2000;

const checkImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(img.src);
      if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
        reject(new Error(`Image dimensions must not exceed ${MAX_DIMENSION}x${MAX_DIMENSION} pixels`));
      }
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
  });
};

const ImageDropbox = ({
  inputRef,
  handleChange,
  file,
  previewUrl,
}: ImageDropBoxProps) => {
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await checkImageDimensions(file);
      await handleChange(event);
    } catch (error) {
      toast.error((error as Error).message);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex w-[600px] flex-col items-center justify-center rounded-3xl shadow-2xl shadow-green-300">
      {/* Hidden select input button */}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png, image/webp"
        ref={inputRef}
        onChange={onImageChange}
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
