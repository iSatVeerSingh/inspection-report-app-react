"use client";

import PageLayout from "../../Layout/PageLayout";
import LibraryItemForm from "../../components/LibraryItemForm";

const NewLibraryItem = () => {
  return (
    <PageLayout title="New Library Item">
      <LibraryItemForm newItem />
    </PageLayout>
  );
};

export default NewLibraryItem;
