import Jimp from "jimp";
import path from "path";

const Editor = async (
  file_path: string,
  caption_top: string,
  caption_bottom: string
) => {
  // Definindo write_path
  const write_dir = path.resolve(__dirname, "..", "..", "..", "tmp");
  const write_path = `${write_dir}/dscrd-${file_path.split("/").pop()}`;

  const loaded_image = await Jimp.read(file_path);

  // Resize da imagem para 800px no máximo
  loaded_image.scaleToFit(800, 800);

  // Abrindo fonte
  const font_path = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "fonts",
    "IMPACT_48.fnt"
  );
  const font = await Jimp.loadFont(font_path);

  // Definição dos textos na imagem
  const top_text = {
    text: caption_top,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_TOP,
  };
  const bottom_text = {
    text: caption_bottom,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
  };

  // Escrevendo
  loaded_image.print(
    font,
    8,
    8,
    top_text,
    loaded_image.getWidth() - 16,
    loaded_image.getHeight() - 16
  );
  loaded_image.print(
    font,
    8,
    8,
    bottom_text,
    loaded_image.getWidth() - 16,
    loaded_image.getHeight() - 16
  );

  // Salvando arquivo
  loaded_image.write(write_path);

  return write_path;
};

export default Editor;
