import Jimp from "jimp";
import path from "path";

const Editor = async (
  file_name: string,
  caption_top: string,
  caption_bottom: string
) => {
  // Abrindo arquivo e fonte
  const file_path = path.resolve(__dirname, "..", "tmp", file_name);
  const font_path = path.resolve(__dirname, "..", "fonts", "IMPACT_48.fnt");
  const loaded_image = await Jimp.read(file_path);
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

  // Resize da imagem para 800px no máximo
  loaded_image.scaleToFit(800, 800);

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
  loaded_image.write(
    path.resolve(__dirname, "..", "tmp", `edited-${file_name}`)
  );
  console.log("Image edited!");
};

export default Editor;
