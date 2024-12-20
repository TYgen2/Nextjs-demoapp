const SuccessSubmissionPage = async ({
  searchParams,
}: {
  searchParams: { productDetails: string };
}) => {
  const { productDetails } = await searchParams;

  if (!productDetails) return <div>Something went wrong!!</div>;

  return (
    <div>
      <h1>Success submission</h1>
      <p>Product details: {productDetails}</p>
    </div>
  );
};

export default SuccessSubmissionPage;
