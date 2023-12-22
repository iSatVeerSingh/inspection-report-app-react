import PageLayout from "../../Layout/PageLayout";
import LibraryItemForm from "../../components/LibraryItemForm";
import { useGlobalContext } from "../../context/globalContext";

const NewLibraryItem = () => {
  const { user } = useGlobalContext();
  if (user.role === "Inspector") {
    return null;
  }

  return (
    <PageLayout title="New Library Item">
      <LibraryItemForm />
    </PageLayout>
  );
};

export default NewLibraryItem;
