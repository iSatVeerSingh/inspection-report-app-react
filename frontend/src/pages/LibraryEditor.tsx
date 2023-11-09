"use client";

import PageLayout from "../Layout/PageLayout";
import ButtonPrimary from "../components/ButtonPrimary";
import inspectionApi, { libraryApi } from "../services/api";

const LibraryEditor = () => {
  const handleAllItems = async () => {
    const response = await inspectionApi.get("/all-library-items.json");
    if (response.status !== 200) {
      console.log("something went wrong");
      return;
    }

    const allitems = response.data;

    for (let i = 120; i < allitems.length; i++) {
      const item = allitems[i];

      const newItem: any = {
        category: item.category,
        name: item.itemName,
        openingParagraph: JSON.stringify([
          {
            text: item.openingParagraph,
          },
        ]),
        closingParagraph: JSON.stringify([
          {
            text: item.closingParagraph,
          },
        ]),
        summary: item.summary,
      };

      if(item['embeddedImage']) {
        newItem['embeddedImage'] = item['embeddedImage'].toString();
      }

      const newRes = await libraryApi.post("", newItem);
      console.log(newRes.data);
    }
  };

  return (
    <PageLayout title="Libary Editor">
      <ButtonPrimary onClick={handleAllItems}>Add All Items</ButtonPrimary>
    </PageLayout>
  );
};

export default LibraryEditor;
