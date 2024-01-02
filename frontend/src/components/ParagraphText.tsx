import { Text } from "@chakra-ui/react";
import { getItemPargarph } from "../utils/itemParagraph";

const ParagraphText = ({ paragraph }: { paragraph: string }) => {
  const parsedText = getItemPargarph(paragraph);

  if (typeof parsedText === "string") {
    return <Text>{parsedText}</Text>;
  }

  return (
    <>
      {parsedText.map((para, index) => (
        <Text key={index}>
          {para.text.map((subPara, index) => (
            <Text
              key={index}
              as={"span"}
              fontWeight={subPara.bold ? "bold" : "normal"}
              fontStyle={subPara.italics ? "italic" : "normal"}
              textDecoration={
                subPara.decoration
                  ? typeof subPara.decoration === "string"
                    ? subPara.decoration
                    : subPara.decoration.join(" ")
                  : "none"
              }
            >
              {subPara.text}
            </Text>
          ))}
        </Text>
      ))}
    </>
  );
};

export default ParagraphText;
