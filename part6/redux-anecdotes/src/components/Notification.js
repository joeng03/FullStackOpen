import { connect } from "react-redux";
const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};
const Notification = (props) => {
  return (
    <>
      Notification:
      <div style={style}>{props.notification}</div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);
