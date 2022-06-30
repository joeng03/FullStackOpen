import { connect } from "react-redux";
import { updateFilter } from "../reducers/filterReducer";
const style = {
  marginBottom: 10,
};

const Filter = (props) => {
  const handleChange = (e) => {
    props.updateFilter(e.target.value);
  };
  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};
const mapDispatchToProps = {
  updateFilter,
};
export default connect(null, mapDispatchToProps)(Filter);
