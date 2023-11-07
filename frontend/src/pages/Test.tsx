import PageLayout from "../Layout/PageLayout";
import ButtonPrimary from "../components/ButtonPrimary";
import inspectionApi from "../services/api";

const Test = () => {
  const handleTest = async () => {
    const token =
      "Basic Y29tcGFueUBjb3JyZWN0aW5zcGVjdGlvbnMuY29tLmF1OncyWFo0NjhyaExw";
    // const serviceUrl = `https://api.servicem8.com/api_1.0/job.json?%24filter=generated_job_id%20eq%20'15809'`
    // const serviceUrl = `https://api.servicem8.com/api_1.0/companycontact.json?%24filter=company_uuid%20eq%20'670f37b3-71ad-4b2a-ba7d-1f95eb541e5b'`;

    const serviceUrl = `https://api.servicem8.com/api_1.0/jobactivity.json?%24filter=job_uuid%20eq%20'fde596c5-b58e-480f-b7c9-1f95e8a6fcdb'`;
    const response = await inspectionApi.get(serviceUrl, {
      headers: {
        Authorization: token,
      },
    });

    console.log(response.data);
  };

  return (
    <PageLayout title="Test">
      <ButtonPrimary onClick={handleTest}>Test ServiceM8</ButtonPrimary>
    </PageLayout>
  );
};

export default Test;
