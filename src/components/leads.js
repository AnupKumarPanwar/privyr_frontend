import { MDBDataTableV5 } from "mdbreact";

const Leads = ({ datatable }) => {
  return (
    <MDBDataTableV5
      hover
      entriesOptions={[5, 10, 20]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      fullPagination
    />
  );
};

export default Leads;
