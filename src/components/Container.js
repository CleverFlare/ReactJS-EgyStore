const Container = (props) => {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "90vw",
      }}
    >
      {props.children}
    </div>
  );
};

export default Container;
